package com.ahahou3.user_center.common;

/**
 * 错误码
 *
 * @author ahahou3
 */
public enum ErrorCode {

    SUCCESS(0,"ok",""),
    PARAMETERS_ERROR(400,"请求参数错误",""),
    NULL_ERROR(401,"请求数据为空",""),
    NOT_LOGIN(410,"未登录",""),
    NO_AUTH(40101,"无权限",""),
    SYSTEM_ERROR(50000,"系统内部异常","");

    /**
     * 状态码
     */
    private final int code;
    /**
     *状态码信息
     */
    private final String message;
    /**
     * 状态码详情
     */
    private final String description;

    ErrorCode(int code, String message, String description) {
        this.code = code;
        this.message = message;
        this.description = description;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getDescription() {
        return description;
    }
}
