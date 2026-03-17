export default function limit_text(text, limit= 15) {
    if (text.length <= limit) {
        return text;
    }
    return text.toString().slice(0, limit) + "...";
}