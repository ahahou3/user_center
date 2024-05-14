package com.ahahou3.user_center.service;

import com.ahahou3.user_center.common.BaseResponse;
import com.ahahou3.user_center.model.domain.User;
import com.baomidou.mybatisplus.extension.service.IService;
import jakarta.servlet.http.HttpServletRequest;

/**
* @author wangz
* @description 针对表【user(用户)】的数据库操作Service
* @createDate 2024-04-24 21:28:31
*/
public interface UserService extends IService<User> {

    /**
     * 用户注册
     *
     * @param userAccount   用户账户
     * @param userPassword  用户密码
     * @param checkPassword 校验密码
     * @return 新用户id
     */
    BaseResponse<Long> userRegister(String userAccount, String userPassword, String checkPassword, Integer gender);

    /**
     *用户登录
     *
     * @param userAccount 用户账户
     * @param userPassword  用户密码
     * @return 脱敏后的用户信息
     */
    User userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /**
     * 用户脱敏
     * @param originUser
     * @return 脱敏后用户信息
     */
    User getSaftyUser(User originUser);

    /**
     * 用户注销
     * @param request
     * @return
     */
    int userLogout(HttpServletRequest request);
}
