package com.ahahou3.user_center.controller;

import com.ahahou3.user_center.common.BaseResponse;
import com.ahahou3.user_center.common.ErrorCode;
import com.ahahou3.user_center.common.ResultUtil;
import com.ahahou3.user_center.exception.BusinessException;
import com.ahahou3.user_center.model.domain.User;
import com.ahahou3.user_center.model.domain.request.UserLoginRequest;
import com.ahahou3.user_center.model.domain.request.UserRegisterRequest;
import com.ahahou3.user_center.model.domain.request.UserUpdateRequest;
import com.ahahou3.user_center.service.UserService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.ahahou3.user_center.constant.UserConstants.ADMIN_ROLE;
import static com.ahahou3.user_center.constant.UserConstants.USER_LOGIN_STATE;

/**
 * 用户接口1
 *
 * @author ahahou
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest){
        if(userRegisterRequest == null){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR);
        }
        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        Integer gender = userRegisterRequest.getGender();
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR);
        }
        return userService.userRegister(userAccount, userPassword, checkPassword, gender);
    }

    @PostMapping("/login")
    public BaseResponse<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request){
        if(userLoginRequest == null){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR);
        }
        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if (StringUtils.isAnyBlank(userAccount, userPassword)){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR);
        }
        User user = userService.userLogin(userAccount, userPassword, request);
        return ResultUtil.success(user);
    }

    @PostMapping("/logout")
    public BaseResponse<Integer> userLogout(HttpServletRequest request){
        if (request == null){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR);
        }
        int result = userService.userLogout(request);
        return ResultUtil.success(result);
    }

@GetMapping("/search")
public BaseResponse<List<User>> searchUsers(String userName, String userAccount,  String email,  String phone,
                                            Integer gender,  Integer userRole,HttpServletRequest request) {
    if(!isAdmin(request)) {
        throw new BusinessException(ErrorCode.NO_AUTH);
    }
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();

    // 使用Map存储查询条件
    Map<String, Object> queryConditions = new HashMap<>();
    queryConditions.put("userName", userName);
    queryConditions.put("userAccount", userAccount);
    queryConditions.put("email", email);
    queryConditions.put("phone", phone);
    queryConditions.put("gender", gender);
    queryConditions.put("userRole", userRole);

    // 遍历Map并添加条件到queryWrapper
    queryConditions.forEach((key, value) -> {
        if (value != null && StringUtils.isNotBlank(value.toString())) {
            queryWrapper.like(key, value);
        }
    });
    List<User> userList = userService.list(queryWrapper);
    List<User> list = userList.stream().map(user -> userService.getSaftyUser(user)).collect(Collectors.toList());
    return ResultUtil.success(list);
}

    @GetMapping("/current")
    public BaseResponse<User> getCurrentUser(HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        if (currentUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN);
        }
            Long userId = currentUser.getId();
            //todo校验用户是否合法
            User user = userService.getById(userId);
            User safeUser = userService.getSaftyUser(user);
            return ResultUtil.success(safeUser);
    }

    @PostMapping("/update")
    public BaseResponse<Boolean> updateUser(@RequestBody UserUpdateRequest userUpdateRequest, HttpServletRequest request) {
        if (!isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        if (userUpdateRequest == null || userUpdateRequest.getId() == null || userUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR);
        }

        boolean flag = userService.updateUser(userUpdateRequest);
        return ResultUtil.success(flag);
    }

    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteUser(@RequestBody long id, HttpServletRequest request){
        if(!isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        if (id <= 0){
            throw new BusinessException(ErrorCode.PARAMETERS_ERROR);
        }
        boolean flag = userService.removeById(id);
        return ResultUtil.success(flag);
    }

    /**
     * 是否为管理员
     *
     * @param request
     * @return
     */
    private boolean isAdmin(HttpServletRequest request){
        //仅管理员可查询
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user = (User) userObj;
        return user != null && user.getUserRole() == ADMIN_ROLE;
    }
}
