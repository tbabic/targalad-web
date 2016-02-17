
function level() {
	return 2;
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
	catch(err){
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
	var atr = $('#intId').val();
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
	var currNumber = +$('#lvl' + spellLevel + 'AllCurr').text();
	if(currNumber >= maxNumber) {
		$('#descMemorizeBtn').prop('disabled', true);
	}
	else {
		$('#descMemorizeBtn').prop('disabled', false);
	}
	
	var spellId = this.document.activeElement.parentNode.parentNode.id;
	var descriptionIframe = $('#descriptionIframe');
	var descId = spellId + '_desc';
	var descriptionElement = descriptionIframe.contents().find('#'+descId).clone();
	descriptionSpellId = spellId;
	
	
	
	$('#spellDescription').empty();
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
	
	var maxNumber = +$('#lvl' + spellLevel + 'AllMax').text();
	var currNumber = +$('#lvl' + spellLevel + 'AllCurr').text();
	if(currNumber >= maxNumber) {
		spellTable.find('.memorizeBtn').prop('disabled', true);
	}
	else {
		spellTable.find('.memorizeBtn').prop('disabled', false);
	}
	
	var spells = spellTable.find('.spellRow');
	$.each(spells, function(index, item) {
		var spell = $(item);
		var memorizeBtn = spell.find('.memorizeBtn');
		var dememorizeBtn = spell.find('.dememorizeBtn');
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

function initializeSpellButtons() {

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

}





function clearAll() {
	for (var spellLevel = 0; spellLevel <= 6; spellLevel++) {
		var currNumber = $('#lvl' + spellLevel + 'AllCurr');
		currNumber.text(0);
		reEvaluateAll(spellLevel, true);
	}		
}

function knownSpells() {
	
	$('.spellRow').hide();
	//all cantrips known
	$('#all0SpellsId').find('.spellRow').show();
	
	//level 1 spells known
	$('#Blade_Lash_Id').show();
	$('#Blade_Tutors_Spirit_Id').show();
	$('#Color_Spray_Id').show();
	$('#Frostbite_Id').show();
	$('#Shield_Id').show();
	$('#Shocking_Grasp_Id').show();
	$('#True_Strike_Id').show();
	$('#Vanish_Id').show();
	$('#Windy_Escape_Id').show();
	
}

function spellsNumber(elem, actionId, value) {
	var parent = $(elem);
	var child = parent.find(actionId);

	var newValue = +child.text() + +value;
	if(newValue < 0) {
		newValue = 0;
	}
	child.text(newValue);
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


function showMemorized() {
	
	$('.memorize').hide();
	$('.dememorize').hide();
	$('.cast').show();
	$('.recall').show();
	
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
	$('.memorize').show();
	$('.dememorize').show();
	$('.cast').hide();
	$('.recall').hide();
}

$("#memBtnId").on("change", function(event) {
	if($("#memBtnId").hasClass('active')) {
		showMemorized();
	}else {
		showSpellBook();
	}
});



