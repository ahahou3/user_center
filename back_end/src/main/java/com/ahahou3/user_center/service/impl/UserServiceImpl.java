package com.ahahou3.user_center.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ahahou3.user_center.model.domain.User;
import com.ahahou3.user_center.service.UserService;
import com.ahahou3.user_center.mapper.UserMapper;
import org.springframework.stereotype.Service;

/**
* @author wangz
* @description 针对表【user(用户)】的数据库操作Service实现
* @createDate 2024-04-24 21:28:31
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

}




