

export class ArgsQueue{
    private queryList: string[] = []

    public constructor(
        message: string
    ){
        let queries: string[] = this.splitMessageIntoQueries(message);

        this.createQueryList(queries);
    }

    // 文字列を" "で切りながら分割 (" "も入れるに入れる)
    private splitMessageIntoQueries(message: string) {
        let queries: string[] = [""];
        for (let i = 0; i < message.length; ++i) {
            let currChar = message[i];
            if (currChar === " ")
                queries.push(currChar);
            if (queries[queries.length - 1] === " ") {
                queries.push(currChar);
            }
            else {
                queries[queries.length - 1] += currChar;
            }
        }
        return queries;
    }

    private createQueryList(queries: string[]){
        let isInString: boolean = false;
        const stringIdentifier = '"';

        for (let i=0; i<queries.length; ++i){
            const query = queries[i];
            if (query==="") continue;
            if (isInString===false && query===" ") continue;

            // 文字列の中
            if (isInString){
                if (query.length>1 && queries[0]==stringIdentifier) throw new Error("Syntax Error");

                // 文字列終わり
                if (query.at(query.length-1)==stringIdentifier){
                    isInString = false;
                }
                
                const pushingQuery = query.slice(0, Math.max(query.length - (isInString ? 0 : 1), 0));
                this.queryList[this.queryList.length-1] += pushingQuery
                continue;
            }

            // "がついていたら文字列と認識
            if (query[0]==stringIdentifier) {
                isInString = true;
                const pushingQuery = query.length >= 2 ? query.slice(
                    1, query.length - (query[query.length-1]===stringIdentifier ? 1 : 0)) : "";
                this.queryList.push(pushingQuery);
                continue;
            } 
            this.queryList.push(query);
        }
    }

    public canPopArg(): boolean{
        return this.queryList.length>0;
    }

    public popArg(): string{
        const result = this.queryList[0];
        this.queryList.splice(0, 1);
        return result;
    }

    public getLength(){
        return this.queryList.length;
    }
}

