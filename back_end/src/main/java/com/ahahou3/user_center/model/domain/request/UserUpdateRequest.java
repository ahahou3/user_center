package com.ahahou3.user_center.model.domain.request;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户注册请求体
 *
 * @author ahahou
 */
@Data
public class UserUpdateRequest implements Serializable {

    private static final long serialVersionUID = -8124804601245920969L;

    private Long id;

    private String userName;

    private String email;

    private String phone;

    private Integer gender;

    private String avatarUrl;

    private Integer userRole;
}
