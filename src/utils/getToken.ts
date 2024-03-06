export default function getToken() {
    const token = localStorage.getItem("lexartCellphoneLogin");

    return token;
}
