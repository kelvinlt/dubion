package com.dubion.domain;

import java.io.Serializable;

public class MediaAlbum implements Serializable {

    private Double value;

    public MediaAlbum(Double value) {
        this.value = value;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "MediaAlbum{" +
            "value=" + value +
            '}';
    }
}
