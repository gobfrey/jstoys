$(document).ready(function(){

	$('.ttt-cell').click(function(){
		//don't allow a click if...
		if (
			!$(this).hasClass('blank') //the cell allready has an X or O
			|| ttt_game_is_over()
		)
		{
			return;
		}

		var current_player = get_current_player(); //are we clicking X or O

		set_cell_content(this, current_player); //set X or O on this cell

		var win_line = detect_win_line(current_player); //did the current player just win?
		if (win_line)
		{
			ttt_win(current_player, win_line); //update interface to reflect win
		}

	});

});

//return the line class of a win for a nought or a cross player
function detect_win_line(current_player)
{
	//check to see if anyone has won by checking all possible lines of 3
	var win_lines = ['row-1','row-2','row-3','col-1','col-2','col-3','slash','backslash'];

	//select each line of three that has this click's piece
	for (var i = 0; i < win_lines.length; i++)
	{
		//e.g. .cross.row-1 to see how many crosses are in row 1
		var class_selector = '.' + current_player + '.' + win_lines[i];

		//are there three Xs or Os in this line
		if ($(class_selector).length == 3)
		{
			return win_lines[i];
		}
	}
	return null;
}

//Whose turn is it?
function get_current_player()
{
	//if there are an even number of empty cells, it's an O (let's take turns)
	if( $('.blank').length % 2 == 0)
	{
		return 'nought';
	}
	return 'cross';
}

//set the background image of the cell, add nought or cross class, remove blank class
function set_cell_content(cell, current_player)
{

	//assume it's an X
	var bg_img = 'url(img/crosses.png)';

	if( current_player == 'nought')
	{
		bg_img = 'url(img/noughts.png)';
	}

	//set new background image
	$(cell).css({
			'background' : bg_img,
			'background-position' : $(cell).css('background-position') //preserve position
			});

	//set new class
	$(cell).removeClass('blank');
	$(cell).addClass(current_player);
}

function ttt_game_is_over()
{
	if (
		$('.win-line').length //the came has already been won
		|| !$('.blank').length //no blank cells
	)
	{
		return true;
	}
	return false;
}

function ttt_win(current_player, win_line_class)
{
	//make this the winning line
	$('.' + win_line_class).addClass('win-line');

	var win_message = 'X Wins';
	if (current_player == 'nought')
	{
		win_message = 'O Wins';
	}

	$('#ttt-container').after('<div id="win-status">' + win_message + '</div>');
}
