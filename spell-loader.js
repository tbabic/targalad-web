function initializeSpellbook() {
	loadAllSpells();
}

function loadAllSpells() {
	loadSpells($('#spellTable_0_id'), spells0);
	loadSpells($('#spellTable_1_id'), spells1);
	loadSpells($('#spellTable_2_id'), spells2);
	loadSpells($('#spellTable_3_id'), spells3);
	loadSpells($('#spellTable_4_id'), spells4);
	loadSpells($('#spellTable_5_id'), spells5);
	loadSpells($('#spellTable_6_id'), spells6);
}

function loadSpells(container, spells) {
	for (var i = 0; i<spells.length; i++) {
		var spellHtml = $('#spell_Id').clone();
		spellHtml.attr('id', spells[i][0]);
		spellHtml.find('#nameButton').text(spells[i][1]);
		container.append(spellHtml);
	}
}



var spells0 = [['Acid_Splash_Id','Acid Splash'],
['Arcane_Mark_Id','Arcane Mark'],
['Dancing_Lights_Id','Dancing Lights'],
['Daze_Id','Daze'],
['Detect_Magic_Id','Detect Magic'],
['Disrupt_Undead_Id','Disrupt Undead'],
['Flare_Id','Flare'],
['Ghost_Sound_Id','Ghost Sound'],
['Light_Id','Light'],
['Mage_Hand_Id','Mage Hand'],
['OpenClose_Id','Open/Close'],
['Prestidigitation_Id','Prestidigitation'],
['Ray_of_Frost_Id','Ray of Frost'],
['Read_Magic_Id','Read Magic'],
['Spark_Id','Spark']];

var spells1 = [['Blade_Lash_Id','Blade Lash'],
['Blade_Tutors_Spirit_Id','Blade Tutor\'s Spirit'],
['Burning_Hands_Id','Burning Hands'],
['Chill_Touch_Id','Chill Touch'],
['Color_Spray_Id','Color Spray'],
['Corrosive_Touch_Id','Corrosive Touch'],
['Expeditious_Retreat_Id','Expeditious Retreat'],
['Frostbite_Id','Frostbite'],
['Grease_Id','Grease'],
['Hydraulic_Push_Id','Hydraulic Push'],
['Jump_Id','Jump'],
['Longshot_Id','Longshot'],
['Magic_Missile_Id','Magic Missile'],
['Obscuring_Mist_Id','Obscuring Mist'],
['Ray_of_Enfeeblement_Id','Ray of Enfeeblement'],
['Reduce_Person_Id','Reduce Person'],
['Reinforce_Armaments_Id','Reinforce Armaments'],
['Shield_Id','Shield'],
['Shocking_Grasp_Id','Shocking Grasp'],
['Snowball_Id','Snowball'],
['True_Strike_Id','True Strike'],
['Unerring_Weapon_Id','Unerring Weapon'],
['Unseen_Servant_Id','Unseen Servant'],
['Vanish_Id','Vanish'],
['Warding_Weapon_Id','Warding Weapon'],
['Windy_Escape_Id','Windy Escape'],
['Weaponwand_Id','Weaponwand']];
        
var spells2 = [['Ablative_Barrier_Id','Ablative Barrier'],
['Acid_Arrow_Id','Acid Arrow'],
['Alter_Self_Id','Alter Self'],
['Bear\'s_Endurance_Id','Bear\'s Endurance'],
['Bladed_Dash_Id','Bladed Dash'],
['Blur_Id','Blur'],
['Brow_Gasher_Id','Brow Gasher'],
['Bull\'s_Strength_Id','Bull\'s Strength'],
['Cat\'s_Grace_Id','Cat\'s Grace'],
['Darkness_Id','Darkness'],
['Defensive_Shock_Id','Defensive Shock'],
['Fog_Cloud_Id','Fog Cloud'],
['Frigid_Touch_Id','Frigid Touch'],
['Glitterdust_Id','Glitterdust'],
['Invisibility_Id','Invisibility'],
['Minor_Image_Id','Minor Image'],
['Mirror_Image_Id','Mirror Image'],
['Pilfering_Hand_Id','Pilfering Hand'],
['Pyrotechnics_Id','Pyrotechnics'],
['Scorching_Ray_Id','Scorching Ray'],
['Stone_Call_Id','Stone Call']];


var spells3 = [['Burst_of_Speed_Id','Burst of Speed'],
['Daylight_Id','Daylight'],
['Dispel_Magic_Id','Dispel Magic'],
['Displacement_Id','Displacement'],
['Elemental_Aura_Id','Elemental Aura'],
['Fireball_Id','Fireball'],
['Flame_Arrow_Id','Flame Arrow'],
['Fly_Id','Fly'],
['Force_Hook_Charge_Id','Force Hook Charge'],
['Force_Punch_Id','Force Punch'],
['Gaseous_Form_Id','Gaseous Form'],
['Haste_Id','Haste'],
['Hydraulic_Torrent_Id','Hydraulic Torrent'],
['Keen_Edge_Id','Keen Edge'],
['Lightning_Bolt_Id','Lightning Bolt'],
['Magic_Weapon','_Greater_Id','Magic Weapon',' Greater'],
['Monstrous_Physique_I_Id','Monstrous Physique I'],
['Phantom_Steed_Id','Phantom Steed'],
['Ray_of_Exhaustion_Id','Ray of Exhaustion'],
['Shining_Cord_Id','Shining Cord'],
['Sleet_Storm_Id','Sleet Storm'],
['Slow_Id','Slow'],
['Stinking_Cloud_Id','Stinking Cloud'],
['Twisted_Innards_Id','Twisted Innards'],
['Vampiric_Touch_Id','Vampiric Touch'],
['Versatile_Weapon_Id','Versatile Weapon'],
['Water_Breathing_Id','Water Breathing']];
 
var spells4 = [['spell4_Id','spell4']];
var spells5 = [['spell5_Id','spell5']]; 
var spells6 = [['spell6_Id','spell6']];