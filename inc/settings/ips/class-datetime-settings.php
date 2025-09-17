<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if( !class_exists('FPD_IPS_DateTime') ) {

        class FPD_IPS_DateTime {

                public static function get_options() {

                        return apply_filters('fpd_ips_datetime_settings', array(

                                array(
                                        'title'         => __( 'Auto-Center', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_autoCenter',
                                        'default'       => '',
                                        'type'          => 'select',
                                        'class'         => 'semantic-select',
                                        'allowclear'=> true,
                                        'options'   => array(
                                                "0" => __('No', 'radykal'),
                                                "1" => __('Yes', 'radykal'),
                                        )
                                ),

                                array(
                                        'title'         => __( 'Left', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_x',
                                        'placeholder'   => get_option('fpd_custom_datetime_parameter_x'),
                                        'type'          => 'number',
                                        'custom_attributes' => array(
                                                'min' => 0,
                                                'step' => 1
                                        )
                                ),

                                array(
                                        'title'         => __( 'Top', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_y',
                                        'placeholder'   => get_option('fpd_custom_datetime_parameter_y'),
                                        'type'          => 'number',
                                        'custom_attributes' => array(
                                                'min' => 0,
                                                'step' => 1
                                        )
                                ),

                                array(
                                        'title'         => __( 'Price', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_price',
                                        'placeholder'   => get_option('fpd_custom_datetime_parameter_price'),
                                        'type'          => 'number',
                                        'custom_attributes' => array(
                                                'min' => 0,
                                                'step' => 0.01
                                        )
                                ),

                                array(
                                        'title'         => __( 'Layer Depth', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_z',
                                        'placeholder'   => get_option('fpd_custom_datetime_parameter_z'),
                                        'type'          => 'number',
                                        'custom_attributes' => array(
                                                'min' => -1,
                                                'step' => 1
                                        )
                                ),

                                array(
                                        'title'         => __( 'DateTime Format', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_format',
                                        'placeholder'   => get_option('fpd_custom_datetime_parameter_format'),
                                        'type'          => 'text',
                                ),

                                array(
                                        'title'         => __( 'Enable Time', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_enableTime',
                                        'default'       => '',
                                        'type'          => 'select',
                                        'class'         => 'semantic-select',
                                        'allowclear'=> true,
                                        'options'   => array(
                                                "0" => __('No', 'radykal'),
                                                "1" => __('Yes', 'radykal'),
                                        )
                                ),

                                array(
                                        'title'         => __( 'Min Date', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_minDate',
                                        'placeholder'   => get_option('fpd_custom_datetime_parameter_minDate'),
                                        'type'          => 'text',
                                ),

                                array(
                                        'title'         => __( 'Max Date', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_maxDate',
                                        'placeholder'   => get_option('fpd_custom_datetime_parameter_maxDate'),
                                        'type'          => 'text',
                                ),

                                array(
                                        'title'         => __( 'Draggable', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_draggable',
                                        'default'       => '',
                                        'type'          => 'select',
                                        'class'         => 'semantic-select',
                                        'allowclear'=> true,
                                        'options'   => array(
                                                "0" => __('No', 'radykal'),
                                                "1" => __('Yes', 'radykal'),
                                        )
                                ),

                                array(
                                        'title'         => __( 'Rotatable', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_rotatable',
                                        'default'       => '',
                                        'type'          => 'select',
                                        'class'         => 'semantic-select',
                                        'allowclear'=> true,
                                        'options'   => array(
                                                "0" => __('No', 'radykal'),
                                                "1" => __('Yes', 'radykal'),
                                        )
                                ),

                                array(
                                        'title'         => __( 'Resizable', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_resizable',
                                        'default'       => '',
                                        'type'          => 'select',
                                        'class'         => 'semantic-select',
                                        'allowclear'=> true,
                                        'options'   => array(
                                                "0" => __('No', 'radykal'),
                                                "1" => __('Yes', 'radykal'),
                                        )
                                ),

                                array(
                                        'title'         => __( 'Removable', 'radykal' ),
                                        'id'            => 'custom_datetime_parameter_removable',
                                        'default'       => '',
                                        'type'          => 'select',
                                        'class'         => 'semantic-select',
                                        'allowclear'=> true,
                                        'options'   => array(
                                                "0" => __('No', 'radykal'),
                                                "1" => __('Yes', 'radykal'),
                                        )
                                ),

                        ));

                }

        }

}

?>