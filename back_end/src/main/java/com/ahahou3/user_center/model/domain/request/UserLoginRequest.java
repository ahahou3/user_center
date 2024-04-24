package com.ahahou3.user_center.model.domain.request;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户登录请求体
 *
 * @author ahahou
 */
@Data
public class UserLoginRequest implements Serializable {

    private static final long serialVersionUID = 2594159382870313953L;

    private String userAccount;

    private String userPassword;
}
