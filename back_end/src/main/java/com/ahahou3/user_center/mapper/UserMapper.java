package com.ahahou3.user_center.mapper;

import com.ahahou3.user_center.model.domain.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
* @author wangz
* @description 针对表【user(用户)】的数据库操作Mapper
* @createDate 2024-04-24 21:28:31
* @Entity generator.domain.User
*/
public interface UserMapper extends BaseMapper<User> {

    int getUserId(String userAccount);

    String getUserPwd(String userAccount);
}




