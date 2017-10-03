/*
  var obj = {a: {aa: {aaa: 2}}, b: 4};
  get(obj, 'a.aa.aaa'); // 2
  get(obj, ['a', 'aa', 'aaa']); // 2
  get(obj, 'b.bb.bbb'); // undefined
  get(obj, ['b', 'bb', 'bbb']); // undefined
  get(obj.a, 'aa.aaa'); // 2
  get(obj.a, ['aa', 'aaa']); // 2
  get(obj.b, 'bb.bbb'); // undefined
  get(obj.b, ['bb', 'bbb']); // undefined
*/

export const get = (obj: object, props: string | string[]) => {
    if (typeof props === "string") {
        props = props.split(".");
    }
    let prop: string = props.shift();
    while (prop) {
        obj = obj[prop];
        if (!obj) {
            return obj;
        }
        prop = props.shift();
    }
    return obj;
};

export default get;
