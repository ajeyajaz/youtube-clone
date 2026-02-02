
export default function(page=1, limit=10){
    const MAXLIMIT = 50;
    const DEFAULTPAGE = 1;
    const DEFAULTLIMIT = 10;
    
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
       
    page = (Number.isInteger(page) && page >= DEFAULTPAGE) ? page : DEFAULTPAGE;
   
    limit = (Number.isInteger(limit) && limit > 0) ? limit : DEFAULTLIMIT;
    limit = Math.min(limit, MAXLIMIT);

    return {skip: (page - 1) * limit, limit}
}