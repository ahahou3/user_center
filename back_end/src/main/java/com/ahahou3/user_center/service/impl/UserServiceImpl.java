package com.ahahou3.user_center.service.impl;

import com.ahahou3.user_center.common.ErrorCode;
import com.ahahou3.user_center.exception.BusinessException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ahahou3.user_center.model.domain.User;
import com.ahahou3.user_center.service.UserService;
import com.ahahou3.user_center.mapper.UserMapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.ahahou3.user_center.constant.UserConstants.USER_LOGIN_STATE;

/**
 * 用户服务实现类
 *
* @author wangz
* @description 针对表【user(用户)】的数据库操作Service实现
* @createDate 2024-04-24 21:28:31
*/
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

    @Resource
    private UserMapper userMapper;

    /**
     * 盐，混淆密码
     */
    private static final String SALT = "ahahou3";



    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword) {

        // 1. 校验
        if(StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"参数为空");
        }
        if(userAccount.length() < 4){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"账号长度太短");
        }
        if(userPassword.length() < 8 || checkPassword.length() < 8){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"密码长度太短");
        }
        //账户不能包含特殊字符
        String validPattern = "^[a-zA-Z0-9_]+$";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if(!matcher.find()){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"账户不能包含特殊字符");
        }
        //密码和校验密码相同
        if(!userPassword.equals((checkPassword))){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"两次输入密码不同");
        }
        //账户不能重复
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        long count = userMapper.selectCount(queryWrapper);
        if(count > 0){//检验相同用户名数量
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"用户名重复");
        }

        // 2. 加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());

        // 3. 插入数据
        User user =  new User();
        user.setUserAccount(userAccount);
        user.setUserPassword(encryptPassword);
        boolean saveResult = this.save(user);
        if(!saveResult){//检验存储结果是否为null
            throw new BusinessException(ErrorCode.NULL_ERROR,"账户未存入数据库");
        }
        return user.getId();
    }

    @Override
    public User userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        // 1. 校验
        if(StringUtils.isAnyBlank(userAccount, userPassword)){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"参数为空");
        }
        if(userAccount.length() < 4){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"账号长度太短");
        }
        if(userPassword.length() < 8){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"密码长度太短");
        }
        //账户不能包含特殊字符
        String validPattern = "^[a-zA-Z0-9_]+$";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if(!matcher.find()){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"账户不能包含特殊字符");
        }

        // 2. 加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        //查询用户是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        queryWrapper.eq("userPassword", encryptPassword);
        User user = userMapper.selectOne(queryWrapper);
        //用户不存在
        if(user == null){
            log.info("user login failed, userAccount cannot match userPassword");
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR,"用户名不存在");
        }

        //3.用户脱敏
        User saftyUser = getSaftyUser(user);

        //4.记录用户的登录态
        request.getSession().setAttribute(USER_LOGIN_STATE, user);

        return saftyUser;
    }

    /**
     * 用户脱敏
     * @param originUser
     * @return 脱敏后用户信息
     */
    @Override
    public  User getSaftyUser(User originUser){
        if (originUser == null) {
            throw new BusinessException(ErrorCode.NULL_ERROR);
        }
        User saftyUser = new User();
        saftyUser.setId(originUser.getId());
        saftyUser.setUserName(originUser.getUserName());
        saftyUser.setUserAccount(originUser.getUserAccount());
        saftyUser.setAvatarUrl(originUser.getAvatarUrl());
        saftyUser.setGender(originUser.getGender());
        saftyUser.setUserPassword(originUser.getUserPassword());
        saftyUser.setPhone(originUser.getPhone());
        saftyUser.setEmail(originUser.getEmail());
        saftyUser.setUserStatus(originUser.getUserStatus());
        saftyUser.setCreateTime(originUser.getCreateTime());
        saftyUser.setUserRole(originUser.getUserRole());
        return saftyUser;
    }

    /**
     * 用户注销
     * @param request
     * @return
     */
    @Override
    public int userLogout(HttpServletRequest request){
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return 1;
    }
}




