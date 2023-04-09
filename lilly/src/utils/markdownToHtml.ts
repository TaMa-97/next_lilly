import markdownToHtml from 'zenn-markdown-html'
/**
 * Zenn Markdown による markdown の構文変換を行う
 * @param markdown markdown 記法で書かれたプレーンテキスト
 * @returns 変換結果を String 化したもの
 */
const convertMarkdownToHtml = async (markdown: string) => {
  return markdownToHtml(markdown)
}

export default convertMarkdownToHtml
