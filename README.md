Baidu IFE 2016
=============
Task 1-6不知道说什么，居中的那个实现方法比较多，尤其是一些hack方法，知道了Flex之后发现真神奇，居中也更方便。

Task 7
=====
常见的产品官网
整个container加上个min-width就可以不用太考虑适应性的问题了。
这是[Rank1](https://github.com/chenBuJuan/IFE-FirstStage-Task7)的代码，个人感觉细节做的很好。其中用**纯CSS**做了个轮播图，我在Task 12中使用这个方法却出现了优先级的问题，所以这里我一直有疑问（待解决）。

Task 8
=====
一个类似Bootstrap的响应式（栅格化）布局。
做法也是直接给DOM加类名（比如col-md-4/col-sm-8），然后用CSS里的媒体查询。
PS：calc很好用

Task 9
=====
一个常见的后台管理系统的模板吧
没什么难度，就是花时间（技艺不精的借口233），其中Table的一些默认属性的坑踩一踩，还有-webkit-appearance这个可能用的比较多。话说这个task的CSS写了1K行，还没学SASS和LESS。

Task 10
=====
之前都是写盒模型的。Flex第一眼看上去的确很惊艳。相比盒模型有些api爽到飞起，但是感觉又不如盒模型那样细致，不太敢用的感觉。
但是好像在移动设备上有很大的兼容问题。在以后的项目中用flex试试，尽量取其精华。

Task 11
======
说好的不用JS，rank前几都用了（手动斜眼.jpg）。
这个我没做，好吧就是懒了

Task 12
======
CSS的特性
第一个是nth-child()和nth-of-type()这样的选择器就可以
第二个transition动画
第三个就是前面task 7的遗留问题，(!important && js)都不可以用的痛。


*终于弃了几个第一阶段的坑，到了Js的部分。*

Task 13
======
看起来挺简单，实现也不难。
但是看了[Rank1](https://github.com/jshacker007/ife2016/blob/master/stage2/task13/index.html)的代码，感觉还是native，主要就是下面这几个方面
- 二次封装(不知道有没有这个词)，比如jq的$，原因么，写起来方便。
- 兼容性，除了click事件包括了keyup。
- 数值转换，已经有效数据判断。
健壮性很强，值得学习。
