function linkedList(val) {
  const node = (val = null) => {
    let nextNode = null;
    return {
      val,
      nextNode
    }
  }

  let head_ = null;
  let tail_ = null;

  const head = () => head_;
  const tail = () => tail_;
  const prepend = (val) => {
    let tmp = node(val);
    tmp.nextNode = head_;
    head_ = tmp;
    if (tail_ === null) tail_ = head_;
  };
  const append = (val) => {
    if (tail_ === null) {
      head_ = node(val);
      tail_ = head_;
    }
    else {
      tail_.nextNode = node(val);
      tail_ = tail_.nextNode;
    }
  };
  const size = () => {
    /*return ((nodeHead) => {
      if (nodeHead === null) return 0;
      let tmp = nodeHead;
      let ctr = 0;
      while (tmp !== null) {
        ++ctr;
        tmp = tmp.nextNode;
      }
      return ctr;
    })(head_);*/

    return (function t(nodeHead) {
      if (nodeHead === null) return 0;
      return 1 + t(nodeHead.nextNode);
    })(head_);
  };
  const at = (index) => {
    if (index < 0) index += size();
    return (function t(nodeHead, i) {
      if (nodeHead === null || i < 0) return null;
      return i === 0 ? nodeHead : t(nodeHead.nextNode, i-1);
    })(head_, index);
  };
  const pop = () => {
    let tmp = head_;
    if (tmp === tail_) {
      head_ = null;
      tail_ = null;
      return tmp;
    }
    while (tmp !== null) {
      if (tmp.nextNode === tail_) {
        tail_ = tmp;
        tmp = tmp.nextNode;
        tail_.nextNode = null;
        return tmp;
      }
      tmp = tmp.nextNode;
    }
  };
  const contains = (val) => {
    return (function t(nodeHead, v) {
      if (nodeHead === null) return false;
      return nodeHead.val === v ? true : t(nodeHead.nextNode, v);
    })(head_, val);
  };
  const find = (val) => {
    return (function t(nodeHead, v) {
      //if (nodeHead === null) return null;
      //return nodeHead.val === v ? 0 : 1 + t(nodeHead.nextNode, v); //returning null+1+1...
      let tmp = nodeHead;
      let ctr = 0;
      while (tmp !== null) {
        if (tmp.val === v) return ctr;
        tmp = tmp.nextNode;
        ++ctr;
      }
      return null;
    })(head_, val);
  };
  const toString = () => {
    return (function t(nodeHead) {
      return nodeHead !== null ? `( ${nodeHead.val} ) -> ` + t(nodeHead.nextNode) : '';
    })(head_) + 'null';
  };
  const insertAt = (val, index) => {
    let tmp;
    let prev;
    let maxSize = size();
    if (index < 0) index += maxSize; //sanitize negative
    if (index <= 0) return prepend(val);
    if (index >= maxSize) return append(val);
    
    prev = head_;
    tmp = at(index);
    console.log(prev.nextNode !==tmp);
    while (prev !== null && prev.nextNode !== tmp) {
      prev = prev.nextNode;
    }
    prev.nextNode = node(val);
    prev.nextNode.nextNode = tmp;
  };
  const removeAt = (index) => {
    if (head_ !== null) {
      let tmp;
      let prev = head_;
      let maxSize = size();
      if (index < 0) index += maxSize; //sanitize negative
      if (index <= 0) {
        head_ = head_.nextNode;
        if (head_ === null) tail_ = null;
        return prev;
      }

      tmp = at(index);
      if (tmp === null) return;
      while (prev.nextNode !== tmp) {
        prev = prev.nextNode;
      }
      prev.nextNode = tmp.nextNode;
      if (tail_ === tmp) tail_ = prev;
    }
  };

  const init = (val) => {
    head_ = node(val);
    tail_ = head_;
  };
  init(val);

  return {
    head,
    tail,
    append,
    prepend,
    size,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt
  }
}


//export {
//  linkedList
//};