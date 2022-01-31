class StringUtil {
    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static checkValue(valueToCheck, value) {
        return valueToCheck !== "" ? value  : "En cours de chargement...";
    }

    static date(date) {
        return new Intl.DateTimeFormat("fr-FR", {
            year: "numeric",
            month: "long",
            day: "2-digit"
        }).format(date);
    }

}

export default StringUtil;
