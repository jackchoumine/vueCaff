import  Mock  from "mockjs";
import  ls  from "@/utils/localStorage";

const Random= Mock.Random
const localArticles = ls.getItem('articles');
const localUser = ls.getItem('users');
const localUserName=localUser?localUser.name:undefined;
let nextArticleId=1;
if(Array.isArray(localArticles)&&localArticles.length){    
    //本地存在文章，下一篇文章的ID是本地文章数量加1
    nextArticleId=parseInt((localArticles[localArticles.length-1]).articleId)+1;
}
/**
 * 生成随机文章数组
 * @param {number} num  文章数 默认 10
 * @returns {article[]} 文章数组
 * @example
 * // returns 返回 30 篇随机文章
 * mockArticles(30)
 * @author jackzhoumine-2018年12月31日
 */
let mockArticles = (num=10)=>{
    const forbiddenNames =  [localUserName,'topics'];
    let articles=[];
    let unames=[];
    //限制生成数量
    num=num>60?60:num;
    //如何生成员有个数组的技巧
    const arr = [...Array(num)].forEach((article,index)=>{
        // 随机生成一个常见的英文名
        let uname=Random.first();
        // 已存在，重新生成
        while(unames.includes(uname)||forbiddenNames.indexOf(uname)!==-1){
            uname=Random.first();
        }
        unames.push(uname);
        articles.push({
            uid:index+2,
            articleId:nextArticleId+index,
            // 中文标题 10 到 20字
            title:Random.ctitle(10,20),
            // 3 - 5 个中文段落
            content:Random.cparagraph(3,5),
            date:new Date(),//Long  Date
            likeUsers:[],
            comments:[],
            uname
        })
    })
    //在测试文章中 加入点赞数和评论数
    articles.forEach((article)=>{
        let likeUsers=[];
        let comments=[];
        let randomArticles =  getRandomArticles(articles);
        randomArticles.forEach((article)=>{
            likeUsers.push({
                uid:article.uid,
                uname:article.uname
            })
        });
        randomArticles=getRandomArticles(articles);
        // 加入评论
        randomArticles.forEach((article,index)=>{
            comments.push({
                uid:article.uid,
                commentId:index+1,
                content:Random.csentence(5,10),
                date:new Date(),
                uname:article.uname,
            });
        });
        article.likeUsers=likeUsers
        article.comments=comments
    })
    // 返回测试文章
    return  articles;
}
/**
 * 获取随机文章数组
 * @param {Object[]} articles 文章数组
 * @param {number} [num=5] 想要生成的文章数,默认 5
 * @returns {article[]} 文章数组
 * @author jackzhoumine-2018年12月31日
 */
let getRandomArticles=(articles,num=5)=>{
    const randomNum= Math.floor(Math.random()*num+1);
    const randomArticles= [...Array(randomNum)].map(()=>articles[Math.floor(Math.random()*articles.length)]);
    // 返回去重的文章
    return [...new Set(randomArticles)]
}
// 等价于在函数名前 用 export 导出
export {mockArticles }
/* 
返回值的数据结构
[
  {
    "uid": 2,
    "articleId": 2,
    "title": "命相五经展由造再习设件同火压达六料林",
    "content": "复想到中路光这交少五打么增走支眼各。江给成花元局强非美如动识应地没资。总管全放价毛代外离须经到称。西利世主单果向国收金图整。政所专收三接龙问斗西备界节生话老。",
    "date": "2018-04-05T09:24:54.580Z",
    "likeUsers": [],
    "comments": [],
    "uname": "Jessica"
  }
]
*/
