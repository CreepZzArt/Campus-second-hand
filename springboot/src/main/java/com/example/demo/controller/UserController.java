package com.example.demo.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.core.toolkit.support.LambdaMeta;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.demo.common.Result;
import com.example.demo.mapper.UserMapper;
import com.example.demo.entity.User;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.beans.Customizer;
import java.sql.Wrapper;

//接口
@RestController
@RequestMapping("/user")
public class UserController {
    @Resource
    UserMapper userMapper;
    //    登录接口
    @PostMapping("/login")
    public Result<?> login(@RequestBody User user){
        User res = userMapper.selectOne(Wrappers.<User>lambdaQuery().eq(User::getUsername,user.getUsername()).eq(User::getPassword, user.getPassword()));
        if(res == null){
            return  Result.error(-1, "用户名或密码错误");
        }
        return Result.success();
    }
//    注册接口
@PostMapping("/register")
    public Result<?> register(@RequestBody User user){
        User res = userMapper.selectOne(Wrappers.<User>lambdaQuery().eq(User::getUsername,user.getUsername()));
        if(res != null){
            return  Result.error(-1, "用户名重复");
        }
        if(user.getPassword() == null){
            user.setPassword("123456");
        }
        userMapper.insert(user);
        return Result.success();
    }
//    新增接口
    @PostMapping
    public Result<?> save(@RequestBody User user){
        if(user.getPassword() == null){
            user.setPassword("123456");
        }
        userMapper.insert(user);
        return Result.success();
    }
//    更新接口
    @PutMapping("/updateUserById")
    public Result<?> updateUserById(@RequestBody User user){
        userMapper.updateById(user);
        return Result.success();
    }
//    删除接口通过@PathVariable获取占位符
    @DeleteMapping("/{id}")
    public Result<?> deleteUserById(@PathVariable Long id){
        userMapper.deleteById(id);
        return Result.success();
    }

//查询接口  当前分页，分页大小，关键字查询
    @GetMapping
    public Result<?> findPage(@RequestParam(defaultValue = "1") Integer pageNum,
                              @RequestParam(defaultValue = "10") Integer pageSize,
                              @RequestParam(defaultValue = "") String search){
//       like模糊查询
        LambdaQueryWrapper<User> wrapper = Wrappers.<User>lambdaQuery();
        if(StrUtil.isNotBlank(search)){
            wrapper.like(User::getNickName,search);
        }
        Page<User> userPage = userMapper.selectPage(new Page<>(pageNum,pageSize), wrapper);
        return Result.success(userPage);
    }
}
