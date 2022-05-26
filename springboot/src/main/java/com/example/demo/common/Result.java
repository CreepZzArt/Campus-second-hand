package com.example.demo.common;

public class Result<T> {
    private Integer code;
    private String msg;
    private T date;

    public Integer getCode(){return code;}
    public void setCode(Integer code) {this.code=code;}
    public String getMsg(){return msg;}
    public void setMsg(String msg){this.msg=msg;}
    public T getDate(){return date;}
    public void setDate(T date){this.date=date;}
    public Result(){
    }
    public Result(T date){this.date=date;}
//返回方法
    public static Result success(){
        Result result = new Result<>();
        result.setCode(0);
        result.setMsg("Yes");
        return result;
    }
    public static <T> Result<T> success(T date){
        Result<T> result = new Result<>(date );
        result.setCode(0);
        result.setMsg("Yes");
        return result;
    }
    public static Result error(Integer code ,String msg){
        Result result = new Result();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }

}
