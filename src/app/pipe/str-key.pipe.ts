import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "strKey"
})
export class StrKeyPipe implements PipeTransform {
  /**
   *
   * @param value
   * @param args string
   *
   * 字符串下标访问 对象属性
   * 如
   * ```javascript
   * let person ={
   *  child:{
   * name:'儿子'
   *  }
   * }
   *
   * console.log(person['child.name'])//;undefind
   * ```
   * ```html
   * 现在用管道
   * {{person |strKey:'child.name' }}  ==>儿子
   * ```
   */
  transform(value: Object, args?: string): any {
    let keyArray = args.split(".");
    for (let key of keyArray) {
      value = value[key];
    }
    return value;
  }
}
