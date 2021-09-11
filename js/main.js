(function() {
  'use strict';

  let vm = new Vue({
    el: '#app',
    data: {
      ans: [0,0,0,0,0,0,0,0,0],
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
      A369: [],
      logs: [],
      kaigyo: '\n'
    },
    methods: {
      gameStart: function() {
        if (this.game == true) {
          if (confirm('ゲーム中です。リセットしてもよろしいですか？')) {
            document.main.reset();
            this.ans = [0,0,0,0,0,0,0,0,0];
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
            this.log = [];
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
          let t123 = this.makeArray(this.ans[0], this.ans[1], this.ans[2]);
          let t456 = this.makeArray(this.ans[3], this.ans[4], this.ans[5]);
          let t789 = this.makeArray(this.ans[6], this.ans[7], this.ans[8]);
          let t147 = this.makeArray(this.ans[0], this.ans[3], this.ans[6]);
          let t258 = this.makeArray(this.ans[1], this.ans[4], this.ans[7]);
          let t369 = this.makeArray(this.ans[3], this.ans[5], this.ans[8]);
          this.H123 = this.checkHit(t123, this.A123);
          this.H456 = this.checkHit(t456, this.A456);
          this.H789 = this.checkHit(t789, this.A789);
          this.H147 = this.checkHit(t147, this.A147);
          this.H258 = this.checkHit(t258, this.A258);
          this.H369 = this.checkHit(t369, this.A369);
          this.B123 = this.checkBlow(t123, this.A123, this.H123);
          this.B456 = this.checkBlow(t456, this.A456, this.H456);
          this.B789 = this.checkBlow(t789, this.A789, this.H789);
          this.B147 = this.checkBlow(t147, this.A147, this.H147);
          this.B258 = this.checkBlow(t258, this.A258, this.H258);
          this.B369 = this.checkBlow(t369, this.A369, this.H369);
          let now_log = this.logs.push(this.ans[0] + ' ' + this.ans[1] + ' ' + this.ans[2] + ' ' + this.H123 + ' ' + this.B123 + this.kaigyo + this.ans[3] + ' ' + this.ans[4] + ' ' + this.ans[5] + ' ' + this.H456 + ' ' + this.B456 + this.kaigyo + this.ans[6] + ' ' + this.ans[7] + ' ' + this.ans[8] + ' ' + this.H789 + ' ' + this.B789 + this.kaigyo + this.H147 + ' ' + this.H258 + ' ' + this.H369 + ' H B' + this.kaigyo + this.B147 + ' ' + this.B258 + ' ' + this.B369 + ' B *' + this.kaigyo + ' ');
          this.count = Number(this.count) + 1;
          let result = this.H123 + this.H456 + this.H789 + this.H147 + this.H258 + this.H369
          console.log(result);
          if ( result == 18 ) {
            alert('クリア!')
          }
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
      },
      checkBlow: function(target, answer, hit) {
        let blow = 0;
        for (let i = 0; i < 3; i++) {
          for (let i2 = 0; i2 < 3; i2++) {
            if (answer[i] == target[i2]) {
              blow = blow + 1;
            }
          }
        }
        blow = blow - hit
        return blow
      },
      nextNum: function(num) {
        let kari = 0;
        if(this.ans[num] == 9) {
          this.$set(this.ans, num, 1)
          this.ans[num] = 1;
        } else {
          kari = this.ans[num] + 1;
          this.$set(this.ans, num, kari)
        }
        console.log(this.ans[num]);
        console.log(this.ans);
        return this.ans
      }
    }
  });
})();
