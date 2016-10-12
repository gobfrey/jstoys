$(document).ready(function(){

	$('.ttt-cell').click(function(){

		//don't allow a click if
		if (
			!$(this).hasClass('blank') //the cell allready has an X or O
			|| $('.win-line').length > 0 //the came has already been won
		)
		{
			return;
		}

		//preserve background position (it's reset when the background property is set
		var bgpos = $(this).css('background-position');

		//assume it's an X
		var bg_img = 'url(img/crosses.png)';
		var class_name = 'cross';

		//if there are an even number of empty cells, it's an O
		if( $('.blank').length % 2 == 0)
		{
			bg_img = 'url(img/noughts.png)';
			class_name = 'nought';
		}

		//set new background image
		$(this).css({
			'background' : bg_img,
			'background-position' : bgpos
		});

		//set new class
		$(this).removeClass('blank');
		$(this).addClass(class_name);

		//check to see if anyone has won by checking all possible lines of 3
		var win_lines = ['row-1','row-2','row-3','col-1','col-2','col-3','slash','backslash'];

		for (var i = 0; i < win_lines.length; i++)
		{
			//select each line of three that has this click's piece
			var class_selector = '.' + class_name + '.' + win_lines[i];
			//are there three Xs or Os in this line
			if ($(class_selector).length == 3)
			{
				//make this the winning line
				$(class_selector).addClass('win-line');
			}
		}
	});

});


