package com.ahahou3.user_center.model.domain.request;

import lombok.Data;
import java.io.Serializable;

/**
 * 用户注册请求体
 *
 * @author ahahou
 */
@Data
public class UserRegisterRequest implements Serializable {

    private static final long serialVersionUID = -1796155753364121878L;

    private String userAccount;

    private String userPassword;

    private String checkPassword;
}
