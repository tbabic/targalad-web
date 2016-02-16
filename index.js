var descriptionSpellId = '';
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
	

	$('#mainSection').show();
	$('#spellsSection').hide();
	$('#descriptionSection').hide();
	$('#spellDescriptionSection').hide();
	calculate();
}

function mainClick() {
	$('#mainSection').show();
	$('#spellsSection').hide();
	$('#spellDescriptionSection').hide();
	$('#currSpellLvlId').text(0);
	
}

function spellsClick() {
	$('#mainSection').hide();
	$('#spellsSection').show();
	$('#spellDescriptionSection').hide();
	showSpellLevelSection();
	showSpellBook();
}

function memorizedClick() {
	$('#mainSection').hide();
	$('#spellsSection').show();
	$('#spellDescriptionSection').hide();
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

	var fightDef =$('#fightDefId').hasClass('active');
	var totalDef = $('#totalDefId').hasClass('active');
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
	$('#acNormalId').text(acNormal);

	var acFlat = +base + +armor + +enhancement + +luckBracers + +dance + +amulet + +shield;
	$('#acFlatId').text(acFlat);

	var acTouch = +base +  +dex +  +luckBracers + +dance + +dodge;
	$('#acTouchId').text(acTouch);



	var str = getAttribute('strId');
	var atr = str;
	var finesse = $('#finesseId').hasClass('active');
	if (finesse & dex >= atr) {
		atr = dex;
	}
	var _bab = bab();
	var toHit = +_bab + +atr + +focus + +alphlang + +accStr + +spellCmb + +haste + +toHitFightDef;
	var attacks = [];
	var dmg = "";
	if (totalDef != true) { 
		var i = 0;	
		if ($('#hasteId').hasClass('active') || $('#spellCmbtId').hasClass('active') ) {
			attacks.push(toHit);
			i++;
		}
		while (_bab > 0) {
			attacks.push(toHit);
			i++;
			_bab+= -5;
			toHit+= -5;			
		}
		if ($('#danceId').hasClass('active')) {
			dmg = +dex + +alphlang + +arcStr;
		}
		else {
			dmg = +str + +alphlang + +arcStr;
		}
	}

	$('#attacksId').text(attacks);
	$('#dmgId').text(dmg);
	
	var con = getAttribute('conId');
	var fort=con + fortSave(level());
	$('#svFortId').text(fort);
	
	var wis = getAttribute('wisId');
	var will=wis + willSave(level());
	$('#svWillId').text(will);
	
	var ref=dex + refSave(level());
	$('#svRefId').text(ref);
	
	var die = $('#wpnDmgId').val();
	$('#die').text(die);


}

function getAttribute(id){
	var atr = $('#'+id).text();
	atr = +atr - +10;
	atr = Math.floor(atr / 2);
	return atr;
}

function armorMaxDex() {
	return $('#armorDexId').val();
}

function armorMagic() {
	return $('#armorMagicId').val();
}

function armorBonus() {
	return $('#armorAcId').val();
}

function catsGrace() {
	
	var dex = +$('#dexId').text();
	var cat = $('#catId').hasClass('active');
	if(cat == true)
		$('#dexId').text(+dex + +4);
	else
		$('#dexId').text(+dex - +4);
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
		var int = $('#intId').text();
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
	var bonus = $('#wpnMagicId').val();
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
	
	$('.memorizeBtn').hide();
	$('.dememorizeBtn').hide();
	$('.castBtn').show();
	$('.recallBtn').show();
	
	var spellsList = $('.spellRow');
	$.each(spellsList, function(index, item) {
		var spell = $(item);
		var memorized = spell.find('.memNumId');
		if (memorized.text() > 0) {
			spell.show();
		}
		else {
			spell.hide();
		}
	});
}

function showSpellBook() {

	$('.spellRow').show();
	$('.memorizeBtn').show();
	$('.dememorizeBtn').show();
	$('.castBtn').hide();
	$('.recallBtn').hide();
}



function showSpellLevelSection(spellsLevel) {

	if (spellsLevel == undefined) {
		spellsLevel = $('#currSpellLvlId').text();
	}           
	$('#currSpellLvlId').text(spellsLevel);
	try{
		for (var i = 0; i <=6; i++) {
			var id = 'all' + i + 'SpellsId';
			
			if (i == spellsLevel) {
				$('#'+id).show();
				var maxNum = maxNumSpells(spellsLevel);
				var idMax='lvl'+i+'AllMax';
				var idCurr = 'lvl' + i + 'AllCurr';
				$('#'+idMax).text(maxNum);
			}
			else {
				$('#'+id).hide()
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
	var atr = $('#intId').text();
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
	
	var spellLevel = $('#currSpellLvlId').text();
	var maxNumber = $('#lvl' + spellLevel + 'AllMax').text();
	var currNumber = $('#lvl' + spellLevel + 'AllCurr').text();
	if(currNumber >= maxNumber) {
		$('#descMemorizeBtn').prop('disabled', true);
	}
	else {
		$('#descMemorizeBtn').prop('disabled', false);
	}
	
	var spellId = this.document.activeElement.parentNode.parentNode.id;
	var descriptionIframe = $('#descriptionIframe');
	var descId = spellId + '_desc';
	var descriptionElement = descriptionIframe.contents().find('#'+descId);
	descriptionSpellId = spellId;
	
	
	
	
	$('#spellDescription').append(descriptionElement);
	$('#spellsSection').hide();
	$('#spellDescriptionSection').show();
		
}

		
function reEvaluateAll(spellLevel, reset) {
	
	if (spellLevel == undefined) {
		spellLevel = $('#currSpellLvlId').text();
	}
	var spellTable = $('#spellTable_' + spellLevel + '_id');
	if(reset == true) {
		spellTable.find('.memNumId').text(0);
		spellTable.find('.remNumId').text(0);
	}
	
	var maxNumber = $('#lvl' + spellLevel + 'AllMax').text();
	var currNumber = $('#lvl' + spellLevel + 'AllCurr').text();
	if(currNumber >= maxNumber) {
		spellTable.find('.memorizedBtn').prop('disabled', true);
	}
	else {
		spellTable.find('.memorizedBtn').prop('disabled', false);
	}
	
	var spells = spellTable.find('.spellRow');
	$.each(spells, function(index, item) {
		var spell = $(item);
		var memorizeBtn = spell.find('.memorizedBtn');
		var dememorizeBtn = spell.find('.dememorizedBtn');
		var castBtn = spell.find('.castBtn');
		var recallBtn = spell.find('.recallBtn');
		var memorizedCount = spell.find('.memNumId').text();
		var remainingCount = spell.find('.remNumId').text();

		if (memorizedCount <= 0 || remainingCount <= 0) {
			dememorizeBtn.prop('disabled', true);
			castBtn.prop('disabled', true);
		}
		else {
			dememorizeBtn.prop('disabled', false);
			castBtn.prop('disabled', false);
		}
		if (remainingCount >= memorizedCount) {
			recallBtn.prop('disabled', true);
		}
		else {
			recallBtn.prop('disabled', false);
		}
		
	});
	
	
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
		var currNumber = $('#lvl' + spellLevel + 'AllCurr');
		currNumber0;
		reEvaluateAll(spellLevel, true);
	}
			
}

$(".btn-primary").on("change", function(event) {
	calculate();
	
});

$("#catId").on("change", function(event) {
	catsGrace();	
});

function memorize(spellId, spellLevel) {
	console.log('memorizing spell');
	var parent = $('#'+spellId);
	var spellLevel = $('#currSpellLvlId').text();
	spellsNumber(parent, '.memNumId', +1);
	spellsNumber(parent, '.remNumId', +1);	
	var currNumber = $('#lvl' + spellLevel + 'AllCurr');
	currNumber.text(+currNumber.text() + +1);
	reEvaluateAll(spellLevel);
}

$("#descMemorizeBtn").on("click", function(event) {
	var parentId = descriptionSpellId;
	var spellLevel = $('#currSpellLvlId').text();
	memorize(parentId, spellLevel);
	spellsClick();
	descriptionSpellId = '';
});

$("#descCloseBtn").on("click", function(event) {
	spellsClick();
	descriptionSpellId = '';
});

$(".memorizeBtn").on("click", function(event) {
	var parentId = event.target.parentNode.parentNode.id;
	var spellLevel = $('#currSpellLvlId').text();
	memorize(parentId, spellLevel);
});

$(".dememorizeBtn").on("click", function(event) {
	var parent = event.target.parentNode.parentNode;
	var spellLevel = $('#currSpellLvlId').text();
	spellsNumber(parent, '.memNumId', -1);
	spellsNumber(parent, '.remNumId', -1);
	var currNumber = $('#lvl' + spellLevel + 'AllCurr');
	currNumber.text(+currNumber.text() - +1);
	reEvaluateAll(spellLevel);
});

$(".castBtn").on("click", function(event) {
	var parent = event.target.parentNode.parentNode;
	spellsNumber(parent, '.remNumId', -1);
	reEvaluateAll();
});

$(".recallBtn").on("click", function(event) {

	var parent = event.target.parentNode.parentNode;
	spellsNumber(parent, '.remNumId', +1);
	reEvaluateAll();
});

function spellsNumber(elem, actionId, value) {
	var parent = $(elem);
	var child = parent.find(actionId);

	var newValue = +child.text() + +value;
	if(newValue < 0) {
		newValue = 0;
	}
	child.text(newValue);

}