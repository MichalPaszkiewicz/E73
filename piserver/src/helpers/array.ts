export class ArrayHelper{
    static getMedian(items: any[], transform: (item: any) => any, ignoreNulls = false){
        var transforms = [];
        var counts = [];
        for(var i = 0; i < items.length; i++){
            var transformed = transform(items[i]);
            if(transformed == null && ignoreNulls == true){
                continue;
            }
            if(!transforms.some(t => t == transformed)){
                transforms.push(transformed);
                counts.push(0);
            }
            var index = transforms.indexOf(transformed);
            counts[index]++;
        }
        var max = 0;
        var maxItem = null;
        for(var i = 0; i < transforms.length; i++){
            if(counts[i] > max){
                maxItem = transforms[i];
                max = counts[i];
            }
        }
        return maxItem;
    }
}