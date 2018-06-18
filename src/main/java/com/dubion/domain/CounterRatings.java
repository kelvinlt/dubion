package com.dubion.domain;

import java.io.Serializable;

public class CounterRatings implements Serializable {

    private int value;

    public CounterRatings(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "CounterRatings{" +
            "value=" + value +
            '}';
    }
}
