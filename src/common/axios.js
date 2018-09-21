import axios from 'axios' 

//创建axios实例
var service=axios.create({
    baseURL:process.env.BASE_API,
    timeout:5000
})

//添加请求拦截器
service.interceptors.request.use(function(config){
    console.log('先执行请求拦截器');
    //改为缓存token
    config.headers.token = localStorage.getItem("token");
    return config
},function(error){
    return Promise.reject(error)
})
//添加响应拦截器
service.interceptors.response.use(function(response){ 
    console.log('执行到响应拦截器')
    return response
},function(error){
    console.log('err'+error) 
    return Promise.reject(error)
})

export default{
    //get请求
    get(url,param){ 
        return new Promise((cback,reject)=>{
            service({
                method:'get',
                url,
                params:param,  
            }).then(res=>{  //axios返回的是一个promise对象
                cback(res);  //cback在promise执行器内部 
            }).catch(err=>{
                cback(err.response);  
                if(err.response.status==401){ 
                    //结果为401，表示无权限，或token过期；返回login页面
                    localStorage.clear();
                    location.href='./#/login'; 
                } 
                console.log(err.response,'异常')
            })

        })
    },
    //get请求
    put(url,param){ 
        return new Promise((cback,reject)=>{
            service({
                method:'put',
                url,
                params:param,  
            }).then(res=>{  //axios返回的是一个promise对象
                cback(res);  //cback在promise执行器内部 
            }).catch(err=>{                
                cback(err.response);  
                if(err.response.status==401){ 
                    localStorage.clear();
                    location.href='./#/login'; 
                } 
                console.log(err.response,'异常')
            })
        })
    },
    //post请求
    post(url,param){
        return new Promise((cback,reject)=>{
            service({
                method:'post',
                url,
                data:param,  
            }).then(res=>{
                cback(res)             
            }).catch(err=>{
                cback(err.response);   
                if(err.response.status==401){ 
                    localStorage.clear();
                    location.href='./#/login'; 
                }             
                console.log(err.response,'异常')
            })
        })
    }
}
 