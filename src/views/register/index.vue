<template>
    <div class="bigbox">
        <div class="litbox">
            <div class="titletot"></div>
            <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="username">
                <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
                <el-input placeholder="请再次确认密码" type="password" v-model="form.repassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn-reg" type="primary" @click="onSubmit">注册</el-button>
                <el-link  type="info" @click="$router.push('/login')">登录</el-link>
            </el-form-item>
            
            </el-form>
            
        </div>
    </div>
</template>

<script>
import { registerAPI } from '@/api'
export default{
    name: 'my-register',
    data(){

        const samePwd = (rule, value, callback) => {
            if(value != this.form.password){
                callback(new Error('两次输入的密码不一样'))
            }else{
                callback()
            }
        }
        return {
            form: {
                username: '',
                password: '',
                repassword: ''
            },
            rules: {
                username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                {
                    pattern: /^[a-zA-Z0-9]{1,10}$/,
                    message: '用户名必须是1-10的大小写字母数字',
                    trigger: 'blur'
                }
                ],
                password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                {
                    pattern: /^\S{6,15}$/,
                    message: '密码必须是6-15的非空字符',
                    trigger: 'blur'
                }
                ],
                repassword: [
                { required: true, message: '请再次输入密码', trigger: 'blur' },
                { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' },
                { validator: samePwd, trigger: 'blur' }
                ]
            }
        }
        
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async valid => {
            if (!valid) return false
            // 尝试拿到用户输入的内容
            // console.log(this.regForm)
            // 1. 调用注册接口
            const { data: res } = await registerAPI(this.form)
            console.log(res)
            // 2. 注册失败，提示用户
            if (res.code !== 0) return this.$message.error(res.message)
            // 3. 注册成功，提示用户
            this.$message.success(res.message)
            // 4. 跳转到登录页面
            this.$router.push('/login')
             })
        }
    }
}
</script>
<style lang="less" scoped>
    .bigbox{
        width: 100%;
        height: 100%;
        background-image:url('@/assets/login_bg.jpg');
        background-size: cover;
        position: relative;
    }
    .litbox{
        position: absolute;
        width: 400px;
        height: 335px;
        top: 50%;
        left: 50%;
        transform: translate(-50% ,-50%);
        border-radius: 5px;
        background-color: #fff;
        padding :0 30px;
        box-sizing: border-box;
    }
    .titletot{
        height: 60px;
        background:url('@/assets/login_title.png') center no-repeat;
    }
    .btn-reg{
        width:100%;
    }
</style>