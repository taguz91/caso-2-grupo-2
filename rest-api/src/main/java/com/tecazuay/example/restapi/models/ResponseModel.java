package com.tecazuay.example.restapi.models;

public class ResponseModel {
    
    private boolean status;
    private Object data;
    private String msg;
    
    public ResponseModel(boolean status, Object data, String msg) {
        this.status = status;
        this.data = data;
        this.msg = msg;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}