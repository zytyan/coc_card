This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Next to do

- 为CharacterSheet建立layout.js
  - 每个角色都有一个人物卡，决定如何切换人物卡。
- ModuleSheet页面存放剧本，
- - 一个可以随意拖动的小属性速查表
  - 三个子区域
    - 一个剧情流程显示区域，里面可以绘画思维导图。放在右侧，细长，从上到下显示时间线，左到右表示同步发生的事件。
      - kp视角和玩家视角。kp视角提前输入剧情的完整大纲，和某些剧情文字。
      - 当完成了某段剧情后，玩家得到了某些信息即可选择那些部分展示给玩家。
    - 一个富文本编辑器，
      - 一个用于编辑内容的富文本编辑器。
      - 剧情流程显示器的每个节点都对应于一个文本页。
        - 点击相应的节点可以打开相应的文本页查看。
      - 文本页中包含一种特殊标记。这种特殊标记框选内的文字可以展示给玩家。剩余部分则仅供kp可见。
      - kp的视角是一个文本编辑器，pl的视角则是一个只读的文本显示器。pl可以使用画笔对显示器内的部分进行标记，或者添加文本框记录和分享自己的想法。
        - pl被鼓励使用这种方式记录和汇总想法，进行讨论和解谜。
    - 一个场景显示图，和剧情流程图联动，点击相应的流程节点即可显示相应的场景图。

## Futher idea
- 内置自动读剧本bot（整日摸鱼的三日坊主同款），可以阅读特殊标记框选内的文字展示给玩家。
- chaptgpt 剧情提示功能（如模仿人物回答）
- ModuleSheet思考如何处理秘密团。