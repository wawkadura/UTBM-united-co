class StringUtil {
    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static checkValue(valueToCheck, value) {
        return valueToCheck !== "" ? value  : "En cours de chargement...";
    }
}

export default StringUtil;
