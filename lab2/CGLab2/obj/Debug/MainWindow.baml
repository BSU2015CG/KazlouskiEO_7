   M S B A M L   `   `   `  ����M  ISystem, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089M3clr-namespace:System.ComponentModel;assembly=SystemSystem.ComponentModel  5   	   
 CGLab2    ImageInfoViewer.MainWindow   5   	   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   @cm3clr-namespace:System.ComponentModel;assembly=System    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	     � Title$  Images Info��5   	   $��523.933��6   $��961.254��6.    � 
ResizeMode$ CanMinimize=�6>    � 	Resources 5      ,   &System.ComponentModel.BackgroundWorker   backgroundWorker   WorkerReportsProgress  folderBackgroundWorker��%l   &	        &	 ,       5   
   -   5         . 5   d     5   
   -   5         . 5   p   5	      .��5
      � $��0,0,4,14q�6    � RowDefinitions 5   
   �� 5      $
��480* �6   �� 5      .+�5   
   &   System.Windows.Controls.DataGrid  -   5          Name$ 	ImageGrid��5      $��
10,10,22,0q�6&   $	��Top=�6:   $	��416��6R      GridLinesVisibility$	 All=�6_      AutoGenerateColumns .     Columns 5      0  *System.Windows.Controls.DataGridTextColumn  5      ,  &System.Windows.Controls.DataGridColumn	   Header$	 
Номер��6%   
   
IsReadOnly
 . 1  +System.Windows.Controls.DataGridBoundColumn   Binding 64   ��  �� Path$ Number�   HeaderStyle 5      �� 5       �� 
TargetType=  7System.Windows.Controls.Primitives.DataGridColumnHeader"  6    .�5      ��  �� Property � �� �� Value$ Center=�6K   5      5        5      $	 	File name��6%   
 .  68   �� $
 Name� 5      �� 5      "  6    .�5      ��  � ��$ Center=�6K   5      5        5      $	 
Resolution��6%   
 .  69   �� $ Format� 5       �� 5!      "  6    .�5"      ��  � ��$ Center=�6K   5#      5%        5&      $	 Compressing��6%   
 .  6:   �� $ CompressionType� 5'      �� 5(      "  6    .�5)      ��  � ��$ Center=�6K   5*      5,        5-      $	 Width��6%   
 .  64   �� $ Width� 5.      �� 5/      "  6    .�50      ��  � ��$ Center=�6K   51      53        54      $	 Height��6%   
 .  65   �� $ Height� 55      �� 56      "  6    .�57      ��  � ��$ Center=�6K   58      5:        5;      $	 Horizontal resolution��6%   
 .  6D   �� $ HorisontalResolution� 5<      �� 5=      "  6    .�5>      ��  � ��$ Center=�6K   5?      5A        5B      $	 Vertical resolution��6%   
 .  6B   �� $ VerticalResolution� 5C      �� 5D      "  6    .�5E      ��  � ��$ Center=�6K   5F      5H        5I      $	 Color depth��6%   
 .  6:   �� $ 
ColorDepth� 5J      �� 5K      "  6    .�5L      ��  � ��$ Center=�6K   5M      5O      5Q      � 5R   
   $��58��6   $��10,426,22,-3q�6   $	��Top=�61   $��2��6I   .+�5S      �� -   5         ��Name$ Clear_Button��5S      $��Clear��6+   $
��Left=�6;   $��
318,10,0,0q�6V   $	��Top=�6j   $	��149��6�   $��27��6�   6�   �� 5T      -   5        $ Open_Button��5T      $��	Open file��6*   $
��Left=�6>   $��	10,10,0,0q�6Y   $	��Top=�6l   $	��149��6�   $��27��6�   6�   �� 5U      -   5        $ AddAllImages_Button��5U      $��Open folder��62   $
��Left=�6H   $��
164,10,0,0q�6c   $	��Top=�6w   $	��149��6�   $��27��6�   6�   �� 5V      -   5         ��Name$ ProcessLabel��5V      $��590,10,10,21q�6.   $�� ��6D   5W      5X      5Y      