(function() {
  'use strict';

  let vm = new Vue({
    el: '#app',
    data: {
      H123: '',
      B123: '',
      H456: '',
      B456: '',
      H789: '',
      B789: '',
      H147: '',
      B147: '',
      H258: '',
      B258: '',
      H369: '',
      B369: '',
      count: '0',
      game: false,
      answer: [0,0,0,0,0,0,0,0,0],
      A123: [],
      A456: [],
      A789: [],
      A147: [],
      A258: [],
      A369: []
    },
    methods: {
      gameStart: function() {
        if (this.game == true) {
          if (confirm('ゲーム中です。リセットしてもよろしいですか？')) {
            document.main.reset();
            this.answer = [0,0,0,0,0,0,0,0,0];
            this.count = 0;
            this.H123 = '';
            this.B123 = '';
            this.H456 = '';
            this.B456 = '';
            this.H789 = '';
            this.B789 = '';
            this.H147 = '';
            this.B147 = '';
            this.H258 = '';
            this.B258 = '';
            this.H369 = '';
            this.B369 = '';
            this.A123 = [];
            this.A456 = [];
            this.A789 = [];
            this.A147 = [];
            this.A258 = [];
            this.A369 = [];
            this.startSetup();
          } else {
          }
        } else {
          this.startSetup();
        }
      },
      startSetup: function() {
        let kariAns = [];
        let i = 0;
        for (i = 0; i < 9; i++) {
          let check = false;
          let num = 0;
          do {
            num = Math.floor( Math.random(9) * 10 );
            // console.log('random :' + num);
            if (num == 0) {
              // console.log('zero')
              check == false;
            } else {
              if (kariAns.includes(num)) {
                // console.log('double')
                check == false;
              } else {
                break;
              }
            }
          } while(true);
          // console.log('result :' + num);
          let count = kariAns.push(num);
        }
        console.log(kariAns);
        this.answer = kariAns;
        // console.log(this.answer);
        this.game = true;
        this.A123 = this.makeArray(kariAns[0], kariAns[1], kariAns[2]);
        this.A456 = this.makeArray(kariAns[3], kariAns[4], kariAns[5]);
        this.A789 = this.makeArray(kariAns[6], kariAns[7], kariAns[8]);
        this.A147 = this.makeArray(kariAns[0], kariAns[3], kariAns[6]);
        this.A258 = this.makeArray(kariAns[1], kariAns[4], kariAns[7]);
        this.A369 = this.makeArray(kariAns[2], kariAns[5], kariAns[8]);
      },
      checkCode: function() {
        if (this.game == true) {
          let one = document.getElementById('1').value;
          let two = document.getElementById('2').value;
          let three = document.getElementById('3').value;
          let four = document.getElementById('4').value;
          let five = document.getElementById('5').value;
          let six = document.getElementById('6').value;
          let seven = document.getElementById('7').value;
          let eight = document.getElementById('8').value;
          let nine = document.getElementById('9').value;
          let t123 = this.makeArray(one, two, three);
          let t456 = this.makeArray(four, five, six);
          let t789 = this.makeArray(seven, eight, nine);
          let t147 = this.makeArray(one, four, seven);
          let t258 = this.makeArray(two, five, eight);
          let t369 = this.makeArray(three, six, nine);
          this.H123 = this.checkHit(t123, this.A123);
          this.H456 = this.checkHit(t456, this.A456);
          this.H789 = this.checkHit(t789, this.A789);
          this.H147 = this.checkHit(t147, this.A147);
          this.H258 = this.checkHit(t258, this.A258);
          this.H369 = this.checkHit(t369, this.A369);
        } else {
          alert('ゲームが開始されていません。「ゲームスタート/ゲームリセット」をクリックしてください')
        };
      },
      makeArray: function(first, second, third) {
        let tAr = [];
        let one = tAr.push(first);
        let two = tAr.push(second);
        let three = tAr.push(third);
        return tAr;
      },
      checkHit: function(target, answer) {
        let hit = 0;
        for (let i = 0; i < 3; i++) {
          if (target[i] == answer[i]) {
            hit = hit + 1;
          }
        }
        return hit
      }
    }
  });
})();
