package io.acari.landing.flux;

import com.mongodb.reactivestreams.client.gridfs.GridFSDownloadStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;
import reactor.core.publisher.Mono;

import java.nio.ByteBuffer;

public class DownloadStreamToFluxFactory {
    private static final Logger LOGGER = LoggerFactory.getLogger(DownloadStreamToFluxFactory.class);

    public Flux<byte[]> convert(GridFSDownloadStream gridFSDownloadStream) {
        return Flux.create(synchronousSink -> readStream(gridFSDownloadStream, synchronousSink), FluxSink.OverflowStrategy.BUFFER);
    }

    private void readStream(GridFSDownloadStream gridFSDownloadStream, FluxSink<byte[]> synchronousSink) {
        ByteBuffer allocate = ByteBuffer.allocate(512000);
        Mono.from(gridFSDownloadStream.read(allocate))
                .subscribe(bytesRead -> {
                    if (finishedReading(bytesRead)) {
                        Mono.from(gridFSDownloadStream.close())
                                .subscribe(a -> {
                                }, throwable -> {
                                }, synchronousSink::complete);
                    } else {
                        synchronousSink.next(allocate.array());
                        readStream(gridFSDownloadStream, synchronousSink);
                    }
                }, throwable -> {
                    LOGGER.warn("Ohhh snap!", throwable);
                    synchronousSink.complete();
                });
    }

    private boolean finishedReading(Integer read) {
        return read < 0;
    }
}
