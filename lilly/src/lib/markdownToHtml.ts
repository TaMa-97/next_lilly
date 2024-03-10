import markdownToHtml from 'zenn-markdown-html'
/**
 * Zenn Markdown による markdown の構文変換
 */
const convertMarkdownToHtml = async (markdown: string) => {
  return markdownToHtml(markdown)
}

export default convertMarkdownToHtml
