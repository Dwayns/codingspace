new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        damage: 100
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function () {
            
        },
        specialAttack: function () {
            
        },
        heal: function () {
            
        },
        giveUp: function () {
            
        },
        seeDamage: function() {
            this.damage = this.calculateDamage();
        },
        calculateDamage: function() {
            return 300;
        }
    }
})