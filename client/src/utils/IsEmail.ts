export const isValidEmail = (str: string) => {

    const pattern = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/

    return str.match(pattern);    

}