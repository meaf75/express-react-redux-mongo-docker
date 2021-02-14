/**
 * Retorna un objeto valido para el query ob y que sirva de filtro {where: {key: data}}
 * @param {Array} req Request
 */
export function getFilter(req: any){

    /** Store query params */
    const queryParams = req.query

    // Check if there is some query params
    if(Object.keys(queryParams).length == 0){
        return {};
    }

    /** Filter for this query Object */
    var Filter: any = {};

    // Check every param
    Object.keys(queryParams).forEach(queryParam => {
        // Avoid 'page' param
        if(queryParam != 'page'){
            // Get query param value
            const param = queryParams[queryParam];

            // Check if query param has value
            if(param.trim().length > 0){
                // Set filter ♥
                Filter[queryParam] = {$regex: new RegExp(param.toLowerCase(),'i')};                
            }    
        }
    });

    // Filter value
    // console.log('filtro: ',Filter);

    return Filter;
}

/**
 * Retorna el elemento sin las llaves pedidas
 * @param {*} element Objeto a revisar
 * @param {*} except Llaves a evitar
 */
export function GetExcept(object: any,except: string[]): any{
    
    object = CopyObject(object);

    /** Nuevo objeto a retornar */
    var res = {};

    except.forEach(element => {
        delete object[element]
    });

    return object;
}

/**
 * Retorna el elemento con las llaves pedidas
 * @param {Object} element Objeto a revisar
 * @param {String array} only Llaves a pedir
 */
export function GetOnly(element: any,only: string[]){
    
    element = CopyObject(element);

    /** Nuevo objeto a retornar */
    var res : any = {};

    // Verifico cada key del objeto
    only.forEach(key =>{
        res[key] = element[key];
    });

    return res;
}

/**
 * Returns object without specified keys
 * @param {*} object Array Object to remove keys
 * @param {*} except keys to remove 
 */
export function RemoveKeysFromArrayObject(object: any, except: []){

    object = CopyObject(object);

    object.map((x : any) => {
        return GetExcept(x,except);
    })

    return object;
}

/**
 * Remove reference from object
 * @param {*} object object to copy
 */
export function CopyObject(object: any){
    return JSON.parse(JSON.stringify(object));;
}