
//Some functions are inspired from CivClicker, all credits to this amazing game!
//Big thanks to LKD07 & Gigoy for their valuable help!

//Notification script



//Init game data

let currentQuest = null;

// Quests
const Quests = [
  {
    item: "wood",
    qtyMin: 5,
    qtyMax: 15,
    rewardMoney: 0,
    rewardXp: 0
  }
];
//Currency
  
const Resources = {
  wood: {
    total: 0,
    increment: 0.25,
    job: "lumberJack"
  },
  fiber: {
    total: 0,
    increment: 0.50,
    job: "fiberCollector"
  }
};
const Jobs = {
  lumberJack: {
    id: "lumberjackCount",
    total: 0,
    hirePrice: 50,
    hired: false,
    increment: 0
  },
  fiberCollector: {
    id: "fiberCollectorCount",
    total: 0,
    hirePrice: 50,
    hired: false,
    increment: 0
  }
}
  
let money = {
      total: 0
},
//Items
    woodenKey = {
      id: 'woodenKeyCount',
      total: 0,
       price: 3
   },
   woodenStaff = {
       id: 'woodenStaffCount',
       total: 0,
       price: 10,
       learned: false,
       learnPrice: 40,
       tab: 'two-tab'
   },

//Upgrades available
   upgrades = {
       total: 1,
   },

//Hires available
   hires = {
       total: 2,
   };

 
  //Unlockables
  document.getElementById('two-tab').style.display = 'none';  
  


 
 
   //Round numbers to N decimals
 function roundN(num,n){
    return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
  }

 
  function updateResourceTotals() {
	//Update page with resource numbers
	document.getElementById('wood').innerHTML = roundN(Resources.wood.total, 2);
  document.getElementById('fibers').innerHTML = roundN(Resources.fiber.total, 2);
  document.getElementById('money').innerHTML = roundN(money.total, 2);
  document.getElementById('upgradesNb').innerHTML = upgrades.total;
  document.getElementById('hiresNb').innerHTML = hires.total;
  document.getElementById('woodSpeed').innerHTML = Jobs.lumberJack.increment; 
  document.getElementById('fibersSpeed').innerHTML = Jobs.fiberCollector.increment; 
   }

function updateItemTotals() {
	//Update page with items numbers
	document.getElementById('woodenKey').innerHTML = woodenKey.total;
  document.getElementById('woodenStaff').innerHTML = woodenStaff.total;
  document.getElementById('money').innerHTML = roundN(money.total, 2);
   }


// Ressources clicker
  function add(material) {
        material.total = material.total + material.increment;
        updateResourceTotals();
  }

// Item crafter for single materiel items only
  function craftOne(material, itemName, count) {
            if (material.total >= count) {
            material.total -= count;
            itemName.total += 1;
            updateItemTotals();
            updateResourceTotals();
        }   
  }

  // Item crafter for double materiel items only
  function craftTwo(material1, count1, material2, count2, itemName) {
            if (material1.total >= count1 && material2.total >= count2) {
            material1.total -= count1;
            material2.total -= count2;
            itemName.total += 1;
            updateItemTotals();
            updateResourceTotals();
        }   
  }
  
 //Item seller
  function sellAll(item) {
    if (item.total >= 1) {
      money.total += (item.total * item.price);
      item.total = 0;
      updateItemTotals();
    }
  }
        
  
  //Upgrades : Learn a craft
  function learn(item) {
      
        if(money.total >= item.learnPrice) {
        item.learned = true;
        document.getElementById(item.tab).style.display = 'inline';
        upgrades.total -= 1;
        money.total -= item.learnPrice;
        document.getElementById(item.id).style.display = 'none';
        updateResourceTotals();
       }
      }
  
      //Hire
  function hire(job) {
       if(money.total >= job.hirePrice) {
        job.hired = true; 
        job.increment += 0.25;
        hires.total -= 1;
        money.total -= job.hirePrice;
        document.getElementById(job.id).style.display = 'none';
        updateResourceTotals();
    
       }
    }


function checkQuest() {
  if (currentQuest === null && Math.random() < 0.25) {
    currentQuest = Quests[0];
    currentQuest.qty = Math.random() * currentQuest.qtyMax + currentQuest.qtyMin;
  }
}


    //Auto-collect
    function autoIncrement() {
      for (var res in Resources) {
        Resources[res].total += Jobs[Resources[res].job].increment;
      }
      updateResourceTotals();
    }
    
    setInterval(function(){ 
      
      autoIncrement();
      checkQuest();
    }, 1000);
