package com.ahahou3.user_center.exception;

import com.ahahou3.user_center.common.BaseResponse;
import com.ahahou3.user_center.common.ErrorCode;
import com.ahahou3.user_center.common.ResultUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器
 *
 * @author ahahou3
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public BaseResponse businessExceptionHandle(BusinessException e){
        log.error("businessException: " + e.getMessage(), e);
        return ResultUtil.error(e.getCode(),e.getMessage(), e.getDescription());
    }

    @ExceptionHandler(RuntimeException.class)
    public BaseResponse runtimeException(BusinessException e){
        log.error("runtimeException: ", e);
        return ResultUtil.error(ErrorCode.SYSTEM_ERROR, e.getMessage(),"");
    }
}
