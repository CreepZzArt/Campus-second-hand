<template>
  <div class="content">
    <div class="row">
      <div class="row-img">
        <img src="https://s3.bmp.ovh/imgs/2022/05/23/07ac23dfa92aa946.png">
        <div class="row-text">STARFALL</div>
      </div>
      <div class="row-Signin">
        <div class="Signin-set">
          <el-form ref="form" :model = "form">
            <input type="text"  placeholder="用户名" v-model="form.username">
            <br>
            <input type="password"  placeholder="密码" v-model="form.password">
            <br>
            <input type="password"  placeholder="重复密码" v-model="form.confirm">
            <br>
            <input class="button" type="submit" value="注册" @click="register">
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Register",
  data(){
    return{
      form:{}
    }
  },
  methods:{
    async register() {
      try {
        let res = await this.$Get('/api/user/register',this.form);
        if(this.form.password !== this.form.confirm){
          this.$message({
            type:"error",
            message:'2次输入密码不一样'
          })
          this.$message.success('失败');
          return
        }
        console.log('---loginFn-res---', res);
        if (res && res.code != 0) {
          this.$message({
            type:"success",
            message: "注册成功"
          })
          this.$router.push('/login')  //登录成功进行跳转
          this.$message.success('登录成功');
        }else{
          this.$message({
            type:"error",
            message: "注册失败"
          })
            this.$message.success('注册失败');
        }
      } catch (error) {
        console.log('---loginFn-error---', error);
      }
    },
    lregister(){
      if(this.form.password !== this.form.confirm){
        this.$message({
          type:"error",
          message:'2次输入密码不一样'
        })
        return
      }
      Request.post("/user/register", this.form).then( res => {
        if(res.code === '0'){
          this.$message({
            type:"success",
            message: "注册成功"
          })
          window.sessionStorage.setItem("token",res.data.token);
          this.$router.push('/login')  //登录成功进行跳转
          console.log(res)
        } else{
          this.$message({
            type:"error",
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.content{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  background-image: linear-gradient(to right, #45364b, #5a3c53, #714157, #874756, #9a4f51);
}
a {
  text-decoration: none;
  color: #ddd;
  font-size: 0.8em;
  text-align: center;
}
.row{
  height: 300px;
  width: 570px;
  border: 0px solid;
  box-shadow: 5px 11px 10px #2a2a2a;
  border-radius: 40px;
}
.row-img{
  width: 50%;
  height: 100%;
  background-image: linear-gradient(to right top, #231433, #351a3a, #48213f, #592843, #6a3146);
  border-radius: 40px 0 0 40px;
}
.row-img img{
  width: 100%;
  height: 100%;
}
.row-text{
  font-family: Helvetica Neue;
  color: #dc464c;
  font-size: 1.3em;
  font-weight: 400;
  letter-spacing: 18px;
  text-align: center;
  position: absolute;
  margin-top: -70px;
  margin-left: 30px;

}
.row-Signin{
  margin-top: -300px;
  margin-left: 285px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  background-image: linear-gradient(to left, #bd696b, #bc686a, #ba6769, #b96668, #b86567);
  border-radius: 0 40px 40px 0;
}
.Signin-set{
  padding: 60px 20px 50px 10px;
}
form a{
  margin: 20px;
}
.button {
  margin-left: 11%;
  text-align: center;
  margin-top: 15px;
  width: 200px;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 10px 35px 25px 25px;
  margin-bottom: 10px;
}
input {
  margin-left: 20px;
  font-weight: 200;
  width: 215px;
  height: 30px;
  border: none;
  color: #ffffff;
  border-bottom: 1px solid #fff;
  background-color: rgba(0, 0, 0, 0.001);
  /*transparent*/
}
input:focus {
  outline: none;
}
input::placeholder {
  color: white;
}
</style>