var descriptionSpellId = '';

function level() {
	return 3;
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
	knownSpells();
}

function mainClick() {
	$('#currSpellLvlId').text(0);
	$('#mainSection').show();
	$('#spellsSection').hide();
	$('#spellDescriptionSection').hide();
	$('#skillsSection').hide();
}

function spellsClick() {
	showSpellLevelSection();
	showSpellBook();
	knownSpells();
	$('#mainSection').hide();
	$('#spellsSection').show();
	$('#spellDescriptionSection').hide();
	$('#skillsSection').hide();
}

function skillsClick() {
	$('#currSpellLvlId').text(0);
	$('#mainSection').hide();
	$('#spellsSection').hide();
	$('#spellDescriptionSection').hide();
	$('#skillsSection').show();
}

/*function memorizedClick() {
	showSpellLevelSection();
	showMemorized();

	$('#mainSection').hide();
	$('#spellsSection').show();
	$('#spellDescriptionSection').hide();
	
}*/




function calculate() {
	var dex = getAttribute('dexId');
	var str = getAttribute('strId');
	var base = 10;
	var armor = armorBonus();
	var maxDex = armorMaxDex();
	if (parseInt(maxDex, 10) < parseInt(dex, 10)) {
		dex = maxDex;
	}
	var enhancement = 0;
	var luckBracers = 0;
	var dance = 0;
	if (level() >= 7) {
		dance = 2;
	}
	if (level() >= 13) {
		dance = 4;
	}
	var amulet = $('#armorNaturalId').val();
	var deflection = $('#deflectionId').val();
	var shield = shieldBonus();
	var haste = hasteBonus();
	var dodge = 0 + +haste;
	var arcStr = arcaneStrike();
	var accStr = accurateStrike();
	var spellCmb = spellCombat();
	var focus = 0;
	var wpnDamageBonus = weaponDamageBonus();
	var wpnToHitBonus = weaponToHitBonus();

	var fightDef =$('#fightDefId').hasClass('active');
	var totalDef = $('#totalDefId').hasClass('active');
	var acFightDef = 0
	var toHitFightDef = 0;
	var _bab = bab();
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
	var acNormal = +base + +dex + +dodge + +armor + +enhancement + +luckBracers + +dance + +amulet + +shield + +deflection;
	$('#acNormalId').text(acNormal);

	var acFlat = +base + +armor + +enhancement + +luckBracers + +dance + +amulet + +shield + +deflection;
	$('#acFlatId').text(acFlat);

	var acTouch = +base +  +dex +  +luckBracers + +dance + +dodge + +deflection;
	$('#acTouchId').text(acTouch);
	
	var cmd = +base + +_bab + +str + +dex + +deflection + +dodge + +luckBracers + +dance;
	$('#cmdId').text(cmd);


	
	var atrToHit = str;
	var finesse = $('#finesseId').hasClass('active');
	if (finesse && dex >= atrToHit) {
		atrToHit = dex;
	}
	
	var toHit = +_bab + +atrToHit + +focus + +wpnToHitBonus + +accStr + +spellCmb + +haste + +toHitFightDef;
	var attacks = [];
	var dmg = "";
	if (totalDef != true) { 
		var i = 0;	
		if ($('#hasteId').hasClass('active')) {
			attacks.push(toHit);
			i++;
		}
		if ($('#spellCmbtId').hasClass('active') ) {
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
			dmg = +dex + +wpnDamageBonus + +arcStr;
		}
		else {
			dmg = +str + +wpnDamageBonus + +arcStr;
		}
	}
	_bab = bab();

	$('#attacksId').text(attacks);
	$('#dmgId').text(dmg);
	var cmb = +_bab + +str;
	$('#cmbId').text(cmb);
	var cmbWeapon = +_bab + +atrToHit + +focus + +wpnToHitBonus;
	$('#cmbWeaponId').text(cmbWeapon);

	
	var con = getAttribute('conId');
	var fort=+con + +fortSave(level()) + +$('#svFortBonusId').val();
	$('#svFortId').text(fort);
	
	var wis = getAttribute('wisId');
	var will=+wis + +willSave(level()) + +$('#svWillBonusId').val();
	$('#svWillId').text(will);
	
	var ref=+dex + +refSave(level()) + +$('#svRefBonusId').val();
	$('#svRefId').text(ref);
	
	var die = $('#wpnDmgId').val();
	$('#die').text(die);

}

function getAttribute(id){
	var atr = $('#'+id).val();
	atr = +atr - +10;
	atr = Math.floor(atr / 2);
	return atr;
}

function armorMaxDex() {
	return $('#armorDexId').val();
}

function armorBonus() {
	return $('#armorAcId').val();
}

function catsGrace() {
	
	var dex = +$('#dexId').val();
	var cat = $('#catId').hasClass('active');
	if(cat == true)
		$('#dexId').val(+dex + +4);
	else
		$('#dexId').val(+dex - +4);
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
		var int = $('#intId').val();
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

function weaponDamageBonus() {
	var chk = $('#gmwId').hasClass('active');
	var bonus = $('#wpnBonusId').val();
	if (chk == true) {
		var gmw = level() / 4;
		if (gmw > bonus) {
			bonus = gmw;
		}
	}
	return Math.floor(bonus);
	
}

function weaponToHitBonus() {
	var chk = $('#gmwId').hasClass('active');
	var bonus = $('#wpnToHitId').val();
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


$(".attrInput").on("change", function(event) {
	calculate();
});

$(".saveInput").on("change", function(event) {
	calculate();
});

$(".btn-primary").on("change", function(event) {
	calculate();
	
});

$("#catId").on("change", function(event) {
	catsGrace();	
});




