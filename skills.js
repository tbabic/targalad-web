function initializeSkills() {

	var container = $('#skillsSection');
	for (var i = 0; i<skills.length; i++) {
		var skillHtml = $('#temp_skill_id').clone();
		skillHtml.find('.skill-name').text(skills[i][0]);
		skillHtml.attr('id', 'row_'+skills[i][1]);
		skillHtml.find('.skill-rank').attr('data-ref-skill', skills[i][1]);
		skillHtml.find('.skill-bonus').attr('data-ref-skill', skills[i][1]);
		var skillContainer = skillHtml.find('#skill_Id');
		skillContainer.attr('id', skills[i][1]);
		skillContainer.attr('data-ref-attr', skills[i][3]);
		if (skills[i][2]) {
			skillContainer.addClass('armor-check');
		}
		if (skills[i][4]) {
			skillContainer.addClass('class-skill');
		}
		if (skills[i][0].indexOf('*') > -1){
			skillContainer.addClass('untrained');
		}
		container.append(skillHtml);
	}
	
	$('#temp_skill_id').empty();
	
	$('.skill-bonus').on("change", function(event) {
		modifySkill(event.target.dataset.refSkill);
		
	});
	
	$('.skill-rank').on("change", function(event) {
		modifySkill(event.target.dataset.refSkill);
	});
	
	initialRanks();
}

function modifySkill(skillId) {
	var skill = $('#'+skillId);
	var rank = $('#row_'+skillId).find('.skill-rank').val();
	var untrained = skill.hasClass('untrained');
	if (untrained && rank <= 0) {
		skill.text(0);
		skill.addClass('unavailable');
		return;
	}
	
	var bonus = $('#row_'+skillId).find('.skill-bonus').val();
	var classSkill = (skill.hasClass('class-skill') && rank > 0)? 3 : 0;
	var armorCheck = skill.hasClass('armor-check') ? $(acPenaltyId).val() : 0;
	var attrBonus = getAttribute(skill.data().refAttr);
	var value = +rank + +bonus + +classSkill + -armorCheck + +attrBonus;
	
	skill.text(value);
	
}

$('#acPenaltyId').on("change", function(event) {
	modifyAllSkills();
});

function initialRanks() {
	$('#row_Acrobatics_Id').find('.skill-rank').val(3);	
	$('#row_Craft_Id').find('.skill-rank').val(1);
	$('#row_Knowledge_arcana_Id').find('.skill-rank').val(1);
	$('#row_Knowledge_dungeoneering_Id').find('.skill-rank').val(1);
	$('#row_Knowledge_planes_Id').find('.skill-rank').val(1);
	$('#row_Perception_Id').find('.skill-rank').val(2);
	$('#row_Perception_Id').find('.skill-bonus').val(2); //racial elf bonus
	$('#row_Perform_Id').find('.skill-rank').val(2);
	$('#row_Spellcraft_Id').find('.skill-rank').val(1);
	$('#row_Swim_Id').find('.skill-rank').val(1);
	$('#row_Use_Magic_Device_Id').find('.skill-rank').val(1);
	
	modifyAllSkills();
}

function modifyAllSkills(){
	var skillList = $('.skill-value');
	$.each(skillList, function (index, skill) {
		modifySkill(skill.id);
	});	
}



$('#btnShowId').on("click", function(event) {
	$('.skill').show();
	$(event.target).hide();
	$('#btnHideId').show();
	
});

$('#btnHideId').on("click", function(event) {
	hideUnusable();
	$(event.target).hide();
	$('#btnShowId').show();
});

function hideUnusable() {
	var skillList = $('.skill-value');
	$.each(skillList, function (index, skill) {
		var rank = $('#row_'+skill.id).find('.skill-rank').val();
		var untrained = $(skill).hasClass('untrained');
		if (untrained && rank <= 0) {
			$('#row_'+skill.id).hide();
		}
	});	
}

var skills = [['Acrobatics','Acrobatics_Id',true,'dexId',true],
['Appraise','Appraise_Id',false,'intId',false],
['Bluff','Bluff_Id',false,'chaId',false],
['Climb','Climb_Id',true,'strId',true],
['Craft','Craft_Id',false,'intId',true],
['Diplomacy','Diplomacy_Id',false,'chaId',false],
['Disable Device*','Disable_Device_Id',true,'dexId',false],
['Disguise','Disguise_Id',false,'chaId',false],
['Escape Artist','Escape_Artist_Id',true,'dexId',false],
['Fly','Fly_Id',true,'dexId',true],
['Handle Animal*','Handle_Animal_Id',false,'chaId',false],
['Heal','Heal_Id',false,'wisId',false],
['Intimidate','Intimidate_Id',false,'chaId',false],
['Knowledge (arcana)*','Knowledge_arcana_Id',false,'intId',true],
['Knowledge (dungeoneering)*','Knowledge_dungeoneering_Id',false,'intId',true],
['Knowledge (engineering)*','Knowledge_engineering_Id',false,'intId',false],
['Knowledge (geography)*','Knowledge_geography_Id',false,'intId',false],
['Knowledge (history)*','Knowledge_history_Id',false,'intId',false],
['Knowledge (local)*','Knowledge_local_Id',false,'intId',false],
['Knowledge (nature)*','Knowledge_nature_Id',false,'intId',false],
['Knowledge (nobility)*','Knowledge_nobility_Id',false,'intId',false],
['Knowledge (planes)*','Knowledge_planes_Id',false,'intId',true],
['Knowledge (religion)*','Knowledge_religion_Id',false,'intId',false],
['Linguistics*','Linguistics_Id',false,'intId',false],
['Perception','Perception_Id',false,'wisId',false],
['Perform (Dance)','Perform_Id',false,'chaId',true],
['Profession*','Profession_Id',false,'wisId',true],
['Ride','Ride_Id',true,'dexId',false],
['Sense Motive','Sense_Motive_Id',false,'wisId',false],
['Sleight of Hand*','Sleight_of_Hand_Id',true,'dexId',false],
['Spellcraft*','Spellcraft_Id',false,'intId',true],
['Stealth','Stealth_Id',true,'dexId',false],
['Survival','Survival_Id',false,'wisId',false],
['Swim','Swim_Id',true,'strId',true],
['Use Magic Device*','Use_Magic_Device_Id',false,'chaId',true]]

