
function level() {
	return 2;
}

function willSave(lvl) {
	return (2+Math.floor(level()*0.5));
}

function refSave(lvl) {
	return Math.floor(level()*0.334)
}

function fortSave(lvl) {
	return (2+Math.floor(level()*0.5));
}

function bab(lvl) {
	return Math.floor(level()*0.75);
}

function initialize() {
	

	document.getElementById('mainSection').style.display = 'block';
	document.getElementById('spellsSection').style.display = 'none';
	document.getElementById('descriptionSection').style.display = 'none';
	calculate();
}

function mainClick() {
	document.getElementById('mainSection').style.display = 'block';
	document.getElementById('spellsSection').style.display = 'none';
	document.getElementById('currSpellLvlId').textContent = 0;
	
}

function spellsClick() {
	document.getElementById('mainSection').style.display = 'none';
	document.getElementById('spellsSection').style.display = 'block';
	document.getElementById('showAllSpells').checked = true;
	showSpellLevelSection();
	showSpellBook();
}

function memorizedClick() {
	document.getElementById('mainSection').style.display = 'none';
	document.getElementById('spellsSection').style.display = 'block';
	document.getElementById('showAllSpells').checked = false;
	showSpellLevelSection();
	showMemorized();
}



function calculate() {
	var dex = getAttribute('dexId');
	var base = 10;
	var armor = armorBonus();
	var maxDex = armorMaxDex();
	if (parseInt(maxDex, 10) < parseInt(dex, 10)) {
		dex = maxDex;
	}
	var enhancement = armorMagic();
	var luckBracers = 0;
	var dance = 0;
	if (level() >= 7) {
		dance = 2;
	}
	if (level() >= 13) {
		dance = 4;
	}
	var amulet = 0;
	var shield = shieldBonus();
	var haste = hasteBonus();
	var dodge = 0 + +haste;
	var arcStr = arcaneStrike();
	var accStr = accurateStrike();
	var spellCmb = spellCombat();
	var focus = 0;
	var alphlang = weaponBonus();

	var fightDef = document.getElementById('fightDefId').checked;
	var totalDef = document.getElementById('totalDefId').checked;
	var acFightDef = 0
	var toHitFightDef = 0;

	if (totalDef == true) {
		if(level() >= 3) {
			dodge = +dodge + +6;
		}
		else {
			dodge = +dodge + +4;
		}
		
	}
	else if (fightDef == true) {
		if(level() >= 3) {
			dodge = +dodge + +3;
		}
		else {
			dodge = +dodge + +2;
		}
		toHitFightDef = -4;
	}
	var acNormal = +base + +armor + +dex + +enhancement + +luckBracers + +dance + +amulet + +shield + +dodge;
	document.getElementById('acNormalId').textContent = acNormal;

	var acFlat = +base + +armor + +enhancement + +luckBracers + +dance + +amulet + +shield;
	document.getElementById('acFlatId').textContent = acFlat;

	var acTouch = +base +  +dex +  +luckBracers + +dance + +dodge;
	document.getElementById('acTouchId').textContent = acTouch;



	var str = getAttribute('strId');
	var atr = str;
	var finesse = document.getElementById('finesseId').checked
	if (finesse & dex >= atr) {
		atr = dex;
	}

	var toHit = +bab() + +atr + +focus + +alphlang + +accStr + +spellCmb + +haste + +toHitFightDef;
	var toHit2 = +toHit - +5;
	
	var attacks1 = 1;
	var attacks2 = 1;
	if (document.getElementById('hasteId').checked == true)
		attacks1 = +attacks1 + +1;
	if (document.getElementById('spellCmbtId').checked == true)
		attacks1 = +attacks1 + +1;
	var dmg = +dex + +alphlang + +arcStr;

	if (totalDef == true) {
		attacks1 = 0;
		attacks2 = 0;
		toHit = "";
		toHit2 = "";
		dmg = "";
	}

	document.getElementById('tohit1Id').textContent = toHit;
	document.getElementById('attacks1Id').textContent = attacks1;
	document.getElementById('tohit2Id').textContent = toHit2;
	document.getElementById('attacks2Id').textContent = attacks2;         
	document.getElementById('dmgId').textContent = dmg;
	
	var con = getAttribute('conId');
	var fort=con + fortSave(level());
	document.getElementById('svFortId').textContent = fort;
	
	var wis = getAttribute('wisId');
	var will=wis + willSave(level());
	document.getElementById('svWillId').textContent = will;
	
	var ref=dex + refSave(level());
	document.getElementById('svRefId').textContent = ref;
	
	var die = document.getElementById('wpnDmgId').value;
	document.getElementById('die').textContent = die;


}

function getAttribute(id){
	var atr = document.getElementById(id).textContent;
	atr = +atr - +10;
	atr = Math.floor(atr / 2);
	return atr;
}

function armorMaxDex() {
	return document.getElementById('armorDexId').value;
}

function armorMagic() {
	return document.getElementById('armorMagicId').value;
}

function armorBonus() {
	return document.getElementById('armorAcId').value;
}

function catsGrace() {
	
	var dex = +document.getElementById('dexId').textContent;
	var cat = $('#catId').hasClass('active');
	if(cat == true)
		document.getElementById('dexId').textContent = (+dex + +4);
	else
		document.getElementById('dexId').textContent = (+dex - +4);
	calculate();
}


function shieldBonus() {
	var chk = $('#shieldId').hasClass('active');
	var bonus = 0;
	if (chk == true)
		bonus = 4;
	return bonus;
}

function hasteBonus() {
	var chk = $('#hasteId').hasClass('active');
	var bonus = 0;
	if (chk == true)
		bonus = 1;
	return bonus;
}

function accurateStrike() {
	var chk = $('#accStrId').hasClass('active');
	var bonus = 0;
	if (chk == true) {
		var int = document.getElementById('intId').textContent;
		int = +int - +10;
		int = Math.floor(int / 2);
		bonus = int;
	}
	return bonus;
}

function arcaneStrike() {
	var chk = $('#arcStrId').hasClass('active');
	var bonus = 0;
	if (chk == true) {
		var lvl = level();
		bonus = lvl / 5;
		bonus = +bonus + +1;
	}
	return Math.floor(bonus);
}

function spellDance() {
	var lvl = +level() - +1;
	var bonus = lvl / 4;
	bonus = +bonus + +2;
	return Math.floor(bonus);
}

function weaponBonus() {
	var chk = $('#gmwId').hasClass('active');
	var bonus = document.getElementById('wpnMagicId').value;
	if (chk == true) {
		var gmw = level() / 4;
		if (gmw > bonus) {
			bonus = gmw;
		}
	}
	return Math.floor(bonus);
	
}

function spellCombat(){
	var chk = $('#spellCmbtId').hasClass('active');
	var bonus = 0;
	if (chk == true)
		bonus = -2;
	return bonus;        
}

function attackBonus() {
}


function showMemorized() {
	for (var spellLevel = 0; spellLevel <= 6; spellLevel++) {
		var maxNumber = document.getElementById('lvl' + spellLevel + 'AllMax');
		var currNumber = document.getElementById('lvl' + spellLevel + 'AllCurr');
		var spellTable = document.getElementById('spellTable_' + spellLevel + '_id').children[0];
		for (var i = 0; i < spellTable.children.length; i++) {
			var buttons = spellTable.children[i].children[1];
			findChild(buttons, 'memId').style.display = 'none';
			findChild(buttons, 'demId').style.display = 'none';
			findChild(buttons, 'cstId').style.display = '';
			findChild(buttons, 'rclId').style.display = '';
			if (findChild(buttons, 'memNumId').textContent > 0) {
				spellTable.children[i].style.display = '';
			}
			else {
				spellTable.children[i].style.display = 'none';
			}
		}
	}
	
}

function showSpellBook() {
	for (var spellLevel = 0; spellLevel <= 6; spellLevel++) {
		var maxNumber = document.getElementById('lvl' + spellLevel + 'AllMax');
		var currNumber = document.getElementById('lvl' + spellLevel + 'AllCurr');
		var spellTable = document.getElementById('spellTable_' + spellLevel + '_id').children[0];
		for (var i = 0; i < spellTable.children.length; i++) {
			spellTable.children[i].style.display = '';
			var buttons = spellTable.children[i].children[1];
			findChild(buttons, 'memId').style.display = '';
			findChild(buttons, 'demId').style.display = '';
			findChild(buttons, 'cstId').style.display = 'none';
			findChild(buttons, 'rclId').style.display = 'none';
		}
	}
}



function showSpellLevelSection(spellsLevel) {

	if (spellsLevel == undefined) {
		spellsLevel = document.getElementById('currSpellLvlId').textContent;
	}           
	document.getElementById('currSpellLvlId').textContent = spellsLevel;
	try{
		for (var i = 0; i <=6; i++) {
			var id = 'all' + i + 'SpellsId';
			
			if (i == spellsLevel) {
				document.getElementById(id).style.display = 'block';
				var maxNum = maxNumSpells(spellsLevel);
				var idMax='lvl'+i+'AllMax';
				var idCurr = 'lvl' + i + 'AllCurr';
				document.getElementById(idMax).textContent = maxNum;
			}
			else {
				document.getElementById(id).style.display = 'none';
			}
		}
	}
	catch(err)
	{
	}
	reEvaluateAll(spellsLevel);

	
}

function maxNumSpells(spellsLevel) {
	var baseNum = 0;
	if(spellsLevel == 0) {
		baseNum = baseSpells0Level()
	}
	if(spellsLevel == 1) {
		baseNum = baseSpells1Level()
	}
	if(spellsLevel == 2) {
		baseNum = baseSpells2Level()
	}
	if(spellsLevel == 3) {
		baseNum = baseSpells3Level()
	}
	if(spellsLevel == 4) {
		baseNum = baseSpells4Level()
	}
	if(spellsLevel == 5) {
		baseNum = baseSpells5Level()
	}
	if(spellsLevel == 6) {
		baseNum = baseSpells6Level()
	}
	var atr = document.getElementById('intId').textContent;
	atr = +atr - +10;
	atr = Math.floor(atr / 2);
	var bonusNum = 0;
	bonusNum = (atr - +spellsLevel);
	bonusNum = Math.floor(bonusNum / 2);
	if (spellsLevel == 0 || baseNum == 0) {
		bonusNum = 0;
	}
	number = baseNum + +bonusNum;

	return number;
}

function baseSpells0Level() {
	var charLevel = level();
	if (charLevel >= 6) {
		return 5;
	}
	if (charLevel >= 2) {
		return 4;
	}
	return 3;
}

function baseSpells1Level() {
	var charLevel = level();
	if (charLevel >= 9) {
		return 5;
	}
	if (charLevel >= 5) {
		return 4;
	}
	if (charLevel >=3) {
		return 3;
	}
	if (charLevel >=2) {
		return 2;
	}
	return 1;
}

function baseSpells2Level() {
	var charLevel = level();
	if (charLevel >= 12) {
		return 5;
	}
	if (charLevel >= 8) {
		return 4;
	}
	if (charLevel >=6) {
		return 3;
	}
	if (charLevel >=5) {
		return 2;
	}
	if (charLevel >=4) {
		return 1;
	}
	return 0;
}


function baseSpells3Level() {
	var charLevel = level();
	if (charLevel >= 15) {
		return 5;
	}
	if (charLevel >= 11) {
		return 4;
	}
	if (charLevel >=9) {
		return 3;
	}
	if (charLevel >=8) {
		return 2;
	}
	if (charLevel >=7) {
		return 1;
	}
	return 0;
}

function baseSpells4Level() {
	var charLevel = level();
	if (charLevel >= 18) {
		return 5;
	}
	if (charLevel >= 14) {
		return 4;
	}
	if (charLevel >=12) {
		return 3;
	}
	if (charLevel >=11) {
		return 2;
	}
	if (charLevel >=10) {
		return 1;
	}
	return 0;
}

function baseSpells5Level() {
	var charLevel = level();
	if (charLevel >= 19) {
		return 5;
	}
	if (charLevel >= 17) {
		return 4;
	}
	if (charLevel >=15) {
		return 3;
	}
	if (charLevel >=14) {
		return 2;
	}
	if (charLevel >=13) {
		return 1;
	}
	return 0;
}

function baseSpells6Level() {
	var charLevel = level();
	if (charLevel >= 20) {
		return 5;
	}
	if (charLevel >= 19) {
		return 4;
	}
	if (charLevel >=18) {
		return 3;
	}
	if (charLevel >=17) {
		return 2;
	}
	if (charLevel >=16) {
		return 1;
	}
	return 0;
}
function desc() {

	var spellId = this.document.activeElement.parentNode.parentNode.id;
	var descId = spellId + '_desc';
	var doc = document.getElementById('descriptionSection').children[0].getSVGDocument();
	var description = doc.getElementById(descId).textContent;
	var mem = window.confirm(description);
	if (mem == true) {
		memorize(spellId);
	}
	
}


function findChild(elem, id) {
	var retChild;
	for (var i = 0; i < elem.children.length; i++) {
		var child = elem.children[i];
		if (child.attributes.id.value == id) {
			return child;
		}
	}
}

function spellsNumber(elem, actionId, value) {
	var parent = elem;
	var child = findChild(parent, actionId);
	if (child.attributes.id.value == actionId) {
		var newValue = +child.textContent + +value;
		if(newValue < 0) {
			newValue = 0;
		}
		child.textContent = newValue;
	}
}
		
function reEvaluateAll(spellLevel, reset) {

	if (spellLevel == undefined) {
		spellLevel = document.getElementById('currSpellLvlId').textContent;
	}
	var maxNumber = document.getElementById('lvl' + spellLevel + 'AllMax');
	var currNumber = document.getElementById('lvl' + spellLevel + 'AllCurr');
	var spellTable = document.getElementById('spellTable_' + spellLevel + '_id').children[0];
	for (var i = 0; i < spellTable.children.length; i++) {
		var buttons = spellTable.children[i].children[1];
		memorizeBtn = findChild(buttons, 'memId');
		dememorizeBtn = findChild(buttons, 'demId');
		castBtn = findChild(buttons, 'cstId');
		recallBtn = findChild(buttons, 'rclId');
		memorizedNum = findChild(buttons, 'memNumId');
		remainingNum = findChild(buttons, 'remNumId');
		if(reset == true)
		{
			memorizedNum.textContent = 0;
			remainingNum.textContent = 0;
		}

		if (currNumber.textContent >= maxNumber.textContent) {
			memorizeBtn.disabled = true;
		}
		else {
			memorizeBtn.disabled = false;
		}
		if (memorizedNum.textContent <= 0 || remainingNum.textContent <= 0) {
			dememorizeBtn.disabled = true;
			castBtn.disabled = true;
		}
		else {
			dememorizeBtn.disabled = false;
			castBtn.disabled = false;
		}
		if (remainingNum.textContent >= memorizedNum.textContent) {
			recallBtn.disabled = true;
		}
		else {
			recallBtn.disabled = false;
		}
	}
	
}

function memorize(spellId, spellLevel) {
	var parent;
	if (spellId == undefined) {
		parent = this.document.activeElement.parentNode;
	}
	else {
		parent = document.getElementById(spellId).children[1];
	}

	if(spellLevel == undefined) {
		spellLevel = document.getElementById('currSpellLvlId').textContent;
	}
	
	spellsNumber(parent, 'memNumId', +1);
	spellsNumber(parent, 'remNumId', +1);

	
	var currNumber = document.getElementById('lvl' + spellLevel + 'AllCurr');
	currNumber.textContent = +currNumber.textContent + +1;
	reEvaluateAll(spellLevel);
				
	
}

function dememorize(spellId, spellLevel) {
	var parent;
	if (spellId == undefined) {
		parent = this.document.activeElement.parentNode;
	}
	else {
		parent = document.getElementById(spellId).children[1];
	}

	if(spellLevel == undefined) {
		spellLevel = document.getElementById('currSpellLvlId').textContent;
	}
	spellsNumber(parent, 'memNumId', -1);
	spellsNumber(parent, 'remNumId', -1);

	var currNumber = document.getElementById('lvl' + spellLevel + 'AllCurr');
	currNumber.textContent = +currNumber.textContent + -1;
	reEvaluateAll(spellLevel);
}


function castSpell() {
	
	var parent = this.document.activeElement.parentNode;
	spellsNumber(parent, 'remNumId', -1);
	reEvaluateAll();
}

function recall() {
	var parent = this.document.activeElement.parentNode;
	spellsNumber(parent, 'remNumId', +1);
	reEvaluateAll();
}

function memorizeDefault() {
	
	memorize('Arcane_Mark_Id',0);
	memorize('Dancing_Lights_Id',0);
	memorize('Acid_Splash_Id',0);
	memorize('Detect_Magic_Id',0);
	memorize('Mage_Hand_Id',0);
	
	memorize('Shocking_Grasp_Id',1);
	memorize('Shocking_Grasp_Id',1);
	memorize('Chill_Touch_Id',1);
	memorize('Shield_Id',1);
	memorize('Shield_Id',1);
	memorize('Vanish_Id',1);
	memorize('Weaponwand_Id',1);
	
	memorize('Mirror_Image_Id',2);
	memorize("Cat's_Grace_Id",2);
	memorize("Cat's_Grace_Id",2);
	memorize('Bladed_Dash_Id',2);
	memorize('Glitterdust_Id',2);
	
	memorize('Magic_Weapon,_Greater_Id',3);
	memorize('Fireball_Id',3);
	memorize('Fly_Id',3);
	memorize('Elemental_Aura_Id',3);
}

function clearAll() {
	for (var spellLevel = 0; spellLevel <= 6; spellLevel++) {
		var currNumber = document.getElementById('lvl' + spellLevel + 'AllCurr');
		currNumber.textContent = 0;
		reEvaluateAll(spellLevel, true);
	}
			
}

$(".btn-primary").on("change", function(event) {
	calculate();
	
});

$("#catId").on("change", function(event) {
	catsGrace();	
});