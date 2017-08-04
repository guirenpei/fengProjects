'use strict';

const marked = require('marked');
const renderer = new marked.Renderer();

const table = renderer.table;
const paragraph = renderer.paragraph;
renderer.table = function (header, body) {
  console.log('header', header);
  console.log('body', body);
  if (header) {
    return `<table>\n<thead>${header}</thead>\n<tbody>${body}</tbody>\n</table>`;
  }
  return `<table>\n<tbody>${body}</tbody>\n</table>`;
};

renderer.paragraph = function (text) {
  if (text.match(/(\|(.*\|)+)(\n\|(.*\|)+)*/g) || text.match(/(.*(\|.*)+)(\n.*(\|.*)+)*/g)) {
    console.log('找到一个没有被处理的表格', text);
    const lines = text.split('\n').map(line => line.replace(/^\||\|$/g, ''));
    const trs = lines.map(line => line.split('|').map(cell => this.tablecell(cell, {header: false})).join(''));
    const body = trs.map(tr => this.tablerow(tr)).join('');
    return this.table('', body);
  }
  return paragraph.call(this, text);
}

const md = `
# 公共卫生

| 常见学位 | BS、PhD |
| 典型职业及年薪 | 医疗社会工作者：$51,460 |
| 签证敏感度 | 无 |
| 高中课程准备 | 理科、文科 |
| 专业领域 | 生命科学与医学 |
| 美国第一大学 | 约翰霍普金斯大学 |
| 相关排名 | 2014USNEWS公共卫生排名 |

公共卫生（Public Health）主要通过组织社区乃至国家资源，以达到预防疾病，延长民众寿命预期，提高其生活品质及身心健康的一门科学。世界上各类的公共卫生组织，如世界卫生组织、绿色和平组织及世界自然基金会等都属于公共卫生组织。

公共卫生按职能划分，可以分为：

*   卫生保健提供者。如医院、社区健康服务中心、精神卫生组织、实验（检验）中心、护理院，主要提供预防、诊断、康复和护理服务。
*   公共安全组织。如警察局、消防队、医疗急救中心，预防处理紧急伤害和公共卫生事件。
*   环境保护、劳动保护和食品安全机构。作为执法部门，监督和保障安全的生存环境、保障人群健康。
*   文化、教育、体育机构。为社区提供促进健康的精神环境和物质环境。
*   民政、慈善组织。为弱势人群包括失能人士、低收入人士和独居及高龄人士提供政策与物质支持。

## **就业展望**

按职能不同，公共卫生通常包含有诸多分支。公共卫生作为一门专业，通常会学习有关流行性疾病（专注于控制其扩散）、预防医学、健康经济学及健康伦理相关的知识。

公共卫生专业的毕业主要进入公共卫生机构，如医院、急救中心、非营利卫生组织、慈善组织、以及各类与公共卫生相关的政府机构服务。相较医学与护理，公共卫生专业所学知识更为宏观，尤重预防与健康伦理，但也同样包含许多的医学知识，因此其从业范围更加广泛，但想去医院工作要相对困难。以美国为例，该专业本科毕业生最典型的职业是医疗社会工作者（Healthcare Social Workers），年薪51,460美元（2012年5月美国劳工统计局公布的数据）。博士毕业生通常可以从事研究，也可以成为执业医师。

因为医学申请的特殊性（多数需要在相应国家就读至少一年的本科以上教育才可以申请），公共卫生专业往往可以视作是走入医学领域的曲线道路。

## **大学排名**

**2014USNEWS****公共卫生专业排名：**

| 1  | 约翰霍普金斯大学 | Johns Hopkins University  |
| 2  | 北卡罗来纳大学教堂山分校 | University of North Carolina–Chapel Hill  |
| 3  | 哈佛大学 | Harvard University  |
| 4  | 密歇根大学安娜堡分校 | University of Michigan,Ann Arbor  |
| 5  | 哥伦比亚大学 | Columbia University  |
| 6  | 艾茉莉大学 | Emory University  |
| 6  | 华盛顿大学 | University of Washington  |
| 8  | 加州大学伯克利分校 | University of California–Berkeley  |
| 8  | 明尼苏达大学双城分校 | University of Minnesota–Twin Cities  |
| 10  | 加州大学洛杉矶分校 | University of California–Los Angeles  |
| 11  | 波士顿大学 | Boston University  |
| 11  | 匹兹堡大学 | University of Pittsburgh  |
| 13  | 杜兰大学 | Tulane University  |
| 13  | 耶鲁大学 | Yale University  |
| 15  | 德克萨斯休斯敦健康科学中心 | University of Texas–Houston Health Sciences Center  |
| 16  | 乔治华盛顿大学 | George Washington University  |
| 16  | 阿拉巴马大学伯明翰分校 | University of Alabama–Birmingham  |
| 16  | 伊利诺伊大学芝加哥分校 | University of Illinois–Chicago  |
| 16  | 爱荷华大学 | University of Iowa  |
| 20  | 俄亥俄州立大学 | Ohio State University  |
| 21  | 德雷塞尔大学 | Drexel University  |
| 21  | 南佛罗里达大学 | University of South Florida  |
| 23  | 亚利桑那大学 | University of Arizona (Zuckerman)  |
| 23  | 南卡罗来纳大学哥伦比亚分校 | University of South Carolina  |
| 25  | 德州农工健康科学中心 | Texas A&M Health Science Center  |
| 25  | 纽约州立大学阿尔巴尼分校 | University at Albany–SUNY  |
| 25  | 肯塔基大学 | University of Kentucky  |
| 25  | 俄克拉荷马大学 | University of Oklahoma  |
| 29  | 佛罗里达大学 | University of Florida  |
| 30  | 圣地亚哥州立大学 | San Diego State University  |
| 30  | 新泽西理工学院 | UMDNJ-Rutgers-New Jersey Institute of Technology  |
| 30  | 阿肯色大学医学中心 | University of Arkansas for Medical Sciences (Boozman)  |
| 30  | 马里兰大学学院公园分校 | University of Maryland–College Park  |
| 34  | 佐治亚大学 | University of Georgia  |
| 34  | 马萨诸塞大学阿默斯特分校 | University of Massachusetts–Amherst  |
| 36  | 罗马琳达大学 | Loma Linda University  |
| 36  | 圣路易斯大学 | St. Louis University  |
| 36  | 纽约州立大学水牛城分校 | University at Buffalo–SUNY  |
| 36  | 北德克萨斯大学 | University of North Texas Health Science Center  |

**选校分析**

（1）该校公共卫生专业被美国公共卫生协会（Association of Schools of Public Health）认证了吗？——适用美国

（2）该校的公共卫生专业由你感兴趣的方向或分支吗？

（3）对本科申请，本科生参加研究的机会多吗？

（4）实习机会多吗？

（5）需要学过一些什么前置课程才可以申请？

（6）实验室设备先进吗？

（7）你的导师或教授有参与其它项目的研究？

## **典型课程列表**

| 生物I-II | Biology I-II |
| 普通化学 | General Chemistry |
| 有机化学 | Organic Chemistry |
| 普通心理学 | General Psychology |
| 微生物学 | Microbiology |
| 统计学 | Statistics |
| 公共卫生基础 | Introduction to Public Health |
| 健康管理基础 | Introduction to Health Administration |
| 美国医疗保健系统介绍 | Introduction to the U.S. Health Care System |
| 统计推断原理 | Principles of Statistical Inference |
| 健康与公共政策 | Health and Public Policy |
| 流行病学 | Epidemiology |
| 社会和行为科学（公共卫生） | Social and Behavioral Sciences in Public Health |

注：课程列表为本科专业课程列表。

## **心理准备**

你准备好了吗？——

*   Research and write a thesis or dissertation on anything from family planning to mad cow disease
*   Work closely with a faculty adviser
*   Intern at a public health organization in the United States or in another country
*   Specialize in biostatistics, environmental health, health education, or another area

## **学生评价**

“I wrote a proposal on how to improve access to and safety of sites for physical activity for people living in low-SES [socioeconomic status] communities … we often distribute information about making behavioral changes to improve health without thinking about the barriers people might face in making those changes.” -- Morgan, M.S. candidate, public health, Harvard University

# 学校列表

## 美国

### 本科

**综合性大学（非完全列表）：**

| 加州大学伯克利分校 | 德克萨斯大学奥斯汀分校 | 伊利诺伊大学厄本那-香槟分校 |
| 北卡罗来纳大学教堂山分校 | 加州大学圣地亚哥分校 | 乔治敦大学 |
| 加州大学尔湾分校 | 马里兰大学学院公园分校 | 叶史瓦大学 |
| 佛罗里达大学 | 罗格斯大学 | 纽约州立大学水牛城分校 |
| 纽约州立大学阿尔巴尼分校 | 印第安纳大学伯明顿分校 | 德雷塞尔大学 |
| 夏威夷大学马诺阿分校 | 阿拉巴马大学伯明翰分校 | 欧道明大学 |
| 肯塔基大学 | 塔夫斯大学 | 罗切斯特大学 |
| 乔治华盛顿大学 | 杜兰大学 | 杜克大学 |
| 莱斯大学 | 迈阿密大学 | 南加州大学 |
| 圣路易斯大学 | 俄亥俄州立大学 | 艾茉莉大学 |
| 克雷顿大学 | 伊利诺伊大学芝加哥分校 | 俄亥俄大学 |
| 霍夫斯特拉大学 | 圣约翰费舍尔学院 | 圣约翰大学 |
| 伊利诺伊州立大学 | 马萨诸塞大学洛厄尔分校 | 犹他州立大学 |
| 中佛罗里达大学 | 北伊利诺伊大学 | 博林格林州立大学 |
| 安德鲁斯大学 | 新墨西哥州立大学 | 蒙大拿州立大学 |
| 北卡罗来纳大学夏洛特分校 | 肯特州立大学 | 科罗拉多大学丹佛分校 |
| 北达科他大学 | 佐治亚大学 | 亚利桑那州立大学 |
| 南卡罗来纳大学 | 堪萨斯大学 | 科罗拉多州立大学 |
| 圣地亚哥州立大学 | 天普大学 | 纽约州立环境科学与森林学院 |
| 南佛罗里达大学 | 宾州州立大学公园分校 | 布朗大学 |
| 德州农工大学 | 马萨诸塞大学阿默斯特分校 | 雪城大学 |
| 杨百翰大学 | 约翰霍普金斯大学 | 贝勒大学 |
| 圣托马斯大学 | 美利坚大学 | 罗德岛大学 |
| 凯斯西储大学 | 乔治梅森大学 |   |

**文理学院（非完全列表）：**

| 富兰克林与马歇尔学院 | 葛底斯堡学院 |   |

### 研究生

**非完全列表：**

| 耶鲁大学 | 加州大学洛杉矶分校 | 华盛顿大学 |
| 伊利诺伊大学厄本那-香槟分校 | 弗吉尼亚大学 | 北卡罗来纳大学教堂山分校 |
| 加州大学戴维斯分校 | 乔治敦大学 | 加州大学尔湾分校 |
| 马里兰大学学院公园分校 | 乔治梅森大学 | 圣路易斯大学 |
| 田纳西大学 | 伊利诺伊大学芝加哥分校 | 弗吉尼亚理工学院 |
| 佐治亚大学 | 犹他大学 | 辛辛那提大学 |
| 南卡罗来纳大学 | 堪萨斯大学 | 科罗拉多州立大学 |
| 圣地亚哥州立大学 | 天普大学 | 内华达大学雷诺分校 |
| 南佛罗里达大学 | 韦恩州立大学 | 德保罗大学 |
| 布朗大学 | 雪城大学 | 德州农工大学 |
| 杨百翰大学 | 约翰霍普金斯大学 | 马萨诸塞大学阿默斯特分校 |
| 塔夫斯大学 | 罗切斯特大学 | 波士顿大学 |
| 乔治华盛顿大学 | 杜兰大学 | 明尼苏达大学双城分校 |
| 康奈尔大学 | 东北大学 | 密歇根州立大学 |
| 罗格斯大学 | 纽约州立大学水牛城分校 | 纽约州立大学宾汉姆顿分校 |
| 纽约州立大学阿尔巴尼分校 | 德雷塞尔大学 | 达特茅斯学院 |
| 哈佛大学 | 西弗吉尼亚大学 | 夏威夷大学马诺阿分校 |
| 新墨西哥大学 | 阿拉巴马大学伯明翰分校 | 欧道明大学 |
| 弗吉尼亚联邦大学 | 肯塔基大学 | 北卡罗来纳州立大学 |
| 蒙大拿大学 | 堪萨斯州立大学 | 芝加哥洛约拉大学 |
| 宾夕法尼亚大学 | 圣路易斯华盛顿大学 | 艾茉莉大学 |
| 南加州大学 | 俄亥俄州立大学 | 迈阿密大学 |
| 爱荷华大学 | 纽约州立大学石溪分校 | 北达科他大学 |


`;

const html = exports. = marked(md, {renderer});

require('fs').writeFileSync(require('path').join(__dirname, 'test.html'), html, 'utf-8');
