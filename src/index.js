// const config1 = [['(', ')']];
// const config2 = [['(', ')'], ['[', ']']];
// const config3 = [['(', ')'], ['[', ']'], ['{', '}']];
// const config4 = [['|', '|']];
// const config5 = [['(', ')'], ['|', '|']];
// const config6 = [['1', '2'], ['3', '4'], ['5', '6'], ['7', '7'], ['8', '8']];
// const config7 = [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']];

module.exports = function check(str, bracketsConfig) {
    let stack = [];  
    // let result = true;
    for (let i = 0; i < str.length; i++){
        curTag = str[i];
        // console.log('Стек: ', stack, '  текущий элемент ', curTag)
        let allTag = [];
        for (let j = 0; j < bracketsConfig.length; j++){
            let typeOfTag = j;
            allTag = bracketsConfig[j];
            let filtered = allTag.filter(item => {return item === curTag});
            if (filtered.length > 0) break
        }
        let isTagOpen = 0;
        // console.log('Для поиска', allTag, '  current ', curTag, ' stack  ', stack)
        if ((allTag[0] === curTag)&&(allTag[1] !== curTag)){
            // console.log('Add different tag as open ', curTag);
            stack.push(curTag);
        } else {
            // console.log(stack, curTag);
            if (allTag[0]===allTag[1]){
                if (stack[stack.length-1] !== allTag[0]) {
                    // console.log('Add same tag as open ', curTag, stack);
                    stack.push(curTag);
                } else {
                    if (stack.length === 0) {
                      console.log('Extra close tag ', curTag);
                      return false;
                    }
                    if (stack[stack.length-1] === allTag[0]) {
                          // console.log('Remove close tag ', curTag);
                          stack.pop();
                          // console.log('2Стек: ', stack, '  текущий элемент ', curTag)
                    }                  
                }  
            } else {
                if (stack.length === 0) {
                      console.log('Extra close tag ', curTag);
                      return false;
                }
                if (stack[stack.length-1] === allTag[0]) {
                      // console.log('Remove close tag ', curTag);
                      stack.pop();
                      // console.log('2Стек: ', stack, '  текущий элемент ', curTag)
                } else {
                      console.log('Wrong close tag ', curTag)
                      return false;
                }
            }
        }
    }
    if (stack.length !== 0) {
        console.log('Extra open tag ', stack);
        return false;
      } else {
      console.log('All rights');
      return true;
    }
}

// check('()', config1)
// check('((()))()', config1)
// check('())(', config1)
// check('([{}])', config3)
// check('[(])', config2)
// check('[]()', config2)
// check('[]()(', config2)
// check('||', config4)
// check('|()|', config5)
// check('|(|)', config5)
// check('|()|(||)||', config5)
// check('111115611111111222288888822225577877778775555666677777777776622222', config6)
// check('5555512575557777777555566667888888667661133833448441111222233333444442266666', config6)
// check('8888877878887777777888888887777777887887788788887887777777788888888887788888', config6)
// check('111115611111111156111111112222888888222255778777787755556666777777777766222221111222288888822225577877778775555666677777777776622222', config6)
// check('[]][[]', config3)
// check('[]][[]', config2)
// check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]]))()', config7)
// check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])(())', config7)
// check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])((([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])))', config7)